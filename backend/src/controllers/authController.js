const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { sendOtpEmail, sendPasswordResetEmail } = require("../services/emailService");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Generate random 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register user & send verification OTP
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    // If user already exists and is verified
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    let user;
    if (existingUser && !existingUser.isVerified) {
      // Re-register unverified user with new password and OTP
      existingUser.name = name;
      existingUser.password = password; // pre-save will re-hash
      existingUser.phone = phone || existingUser.phone;
      existingUser.verificationOtp = otp;
      existingUser.verificationOtpExpires = otpExpiry;
      user = await existingUser.save();
    } else {
      // Create new unverified user
      user = await User.create({
        name,
        email: normalizedEmail,
        password,
        phone: phone || "",
        isVerified: false,
        verificationOtp: otp,
        verificationOtpExpires: otpExpiry,
      });
    }

    // Send OTP via Brevo SMTP (async error safe)
    try {
      await sendOtpEmail(normalizedEmail, name, otp);
      console.log(`✓ Verification OTP sent to ${normalizedEmail}`);
    } catch (mailErr) {
      console.error("✗ Failed to send OTP email:", mailErr.message);
      // We don't fail registration completely, but inform
    }

    res.status(201).json({
      success: true,
      requiresVerification: true,
      email: normalizedEmail,
      message: `A 6-digit verification code has been sent to ${normalizedEmail}`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify registration OTP and activate account
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and OTP",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({
        success: true,
        message: "Account is already verified. Please sign in.",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      });
    }

    if (!user.verificationOtp || user.verificationOtp !== otp.trim()) {
      return res.status(400).json({ success: false, message: "Invalid verification code. Please check and try again." });
    }

    if (user.verificationOtpExpires && user.verificationOtpExpires < new Date()) {
      return res.status(400).json({ success: false, message: "Verification code has expired. Please request a new one." });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationOtp = null;
    user.verificationOtpExpires = null;
    await user.save();

    res.json({
      success: true,
      message: "Account verified successfully! Welcome to Aura Gems.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Resend registration OTP
// @route   POST /api/auth/resend-otp
// @access  Public
const resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Please provide an email address" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: "No account found with this email" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Account is already verified" });
    }

    const newOtp = generateOtp();
    user.verificationOtp = newOtp;
    user.verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOtpEmail(normalizedEmail, user.name, newOtp);
    res.json({
      success: true,
      message: `A fresh verification code has been sent to ${normalizedEmail}`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (user && (await user.matchPassword(password))) {
      // Check if user is verified (admins are exempt)
      if (!user.isVerified && user.role !== "admin") {
        // Send OTP so user can verify easily
        const otp = generateOtp();
        user.verificationOtp = otp;
        user.verificationOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        try {
          await sendOtpEmail(normalizedEmail, user.name, otp);
        } catch {}

        return res.status(403).json({
          success: false,
          requiresVerification: true,
          email: normalizedEmail,
          message: "Your email is not verified yet. We have sent a verification code to your email.",
        });
      }

      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatar: user.avatar || "",
          addresses: user.addresses,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Request password reset OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Please enter your email" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: "No account found with this email" });
    }

    const otp = generateOtp();
    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
    await user.save();

    await sendPasswordResetEmail(normalizedEmail, user.name, otp);

    res.json({
      success: true,
      message: `Password reset OTP has been sent to ${normalizedEmail}`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify reset OTP & set new password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.resetPasswordOtp || user.resetPasswordOtp !== otp.trim()) {
      return res.status(400).json({ success: false, message: "Invalid reset code" });
    }

    if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
      return res.status(400).json({ success: false, message: "Reset code has expired. Please request a new one." });
    }

    user.password = newPassword; // will be hashed by pre-save
    user.resetPasswordOtp = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully! You can now sign in with your new password.",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/me
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.body.address) {
      user.addresses.push(req.body.address);
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar || "",
        addresses: updatedUser.addresses,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
};
