const nodemailer = require("nodemailer");

// Create reusable transporter object using Brevo SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const FROM_ADDRESS = `"${process.env.EMAIL_FROM_NAME || "Aura Gems Jewelry"}" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`;

// Common luxury styling wrapper
const wrapTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aura Gems</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f5f2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f5f2; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e5dfd8; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 32px 20px; background-color: #241e1b; border-bottom: 2px solid #c5a47e;">
              <h1 style="margin: 0; font-family: Georgia, serif; font-size: 26px; color: #ffffff; letter-spacing: 3px; font-weight: 300;">AURA GEMS</h1>
              <p style="margin: 6px 0 0; font-size: 10px; color: #c5a47e; letter-spacing: 2px; text-transform: uppercase;">Handcrafted Jewelry from Nature's Own Hand</p>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 30px; color: #2c2420; font-size: 14px; line-height: 1.6;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px; background-color: #faf8f5; border-top: 1px solid #e5dfd8; color: #8c7e74; font-size: 11px; line-height: 1.6;">
              <p style="margin: 0 0 8px;"><strong>Aura Gems Jewelry</strong> — Ethical Gemstones & Master Craftsmanship</p>
              <p style="margin: 0;">If you have any questions, reply to this email or contact support at <a href="mailto:support@auragems.com" style="color: #c5a47e; text-decoration: none;">support@auragems.com</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/**
 * Send Account Signup Verification OTP
 */
const sendOtpEmail = async (email, name, otp) => {
  const transporter = createTransporter();
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 20px; color: #2c2420; margin-top: 0; font-weight: normal;">
      Welcome to Aura Gems, ${name}!
    </h2>
    <p style="color: #6b5e54; font-size: 13px;">
      Thank you for creating an account with us. To complete your registration and verify your email address, please use the 6-digit verification code below:
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; background-color: #faf8f5; border: 2px dashed #c5a47e; padding: 16px 32px; border-radius: 4px;">
        <span style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2c2420;">
          ${otp}
        </span>
      </div>
      <p style="color: #9c8e84; font-size: 11px; margin-top: 10px;">
        ⏳ This code is valid for <strong>10 minutes</strong>. Do not share it with anyone.
      </p>
    </div>

    <p style="color: #6b5e54; font-size: 12px; margin-bottom: 0;">
      If you did not request this account registration, please ignore this email.
    </p>
  `;

  return await transporter.sendMail({
    from: FROM_ADDRESS,
    to: email,
    subject: `🔐 Verify Your Account - OTP: ${otp} | Aura Gems`,
    html: wrapTemplate(content),
    text: `Your Aura Gems verification code is: ${otp}. It expires in 10 minutes.`,
  });
};

/**
 * Send Password Reset OTP Email
 */
const sendPasswordResetEmail = async (email, name, otp) => {
  const transporter = createTransporter();
  const content = `
    <h2 style="font-family: Georgia, serif; font-size: 20px; color: #2c2420; margin-top: 0; font-weight: normal;">
      Password Reset Request
    </h2>
    <p style="color: #6b5e54; font-size: 13px;">
      Hello ${name}, we received a request to reset your password for your Aura Gems account. Please use the verification code below to reset it:
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; background-color: #faf8f5; border: 2px dashed #c5a47e; padding: 16px 32px; border-radius: 4px;">
        <span style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #2c2420;">
          ${otp}
        </span>
      </div>
      <p style="color: #9c8e84; font-size: 11px; margin-top: 10px;">
        ⏳ This code is valid for <strong>10 minutes</strong>.
      </p>
    </div>

    <p style="color: #6b5e54; font-size: 12px; margin-bottom: 0;">
      If you did not request a password reset, you can safely ignore this email — your account remains secure.
    </p>
  `;

  return await transporter.sendMail({
    from: FROM_ADDRESS,
    to: email,
    subject: `🔑 Password Reset OTP: ${otp} | Aura Gems`,
    html: wrapTemplate(content),
    text: `Your Aura Gems password reset code is: ${otp}. It expires in 10 minutes.`,
  });
};

/**
 * Send Order Confirmation Receipt Email
 */
const sendOrderConfirmationEmail = async (order) => {
  const transporter = createTransporter();

  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0ede8;">
          <strong style="color: #2c2420; font-size: 13px;">${item.name}</strong><br/>
          <span style="color: #8c7e74; font-size: 11px;">${item.selectedMetal || ""} ${item.selectedSize ? `| Size: ${item.selectedSize}` : ""} | Qty: ${item.quantity}</span>
        </td>
        <td align="right" style="padding: 10px 0; border-bottom: 1px solid #f0ede8; color: #2c2420; font-weight: bold; font-size: 13px;">
          ₹${(item.price * item.quantity).toLocaleString("en-IN")}
        </td>
      </tr>
    `
    )
    .join("");

  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background-color: #e8f5e9; color: #2e7d32; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 12px; text-transform: uppercase;">
        ✓ Order Confirmed
      </span>
      <h2 style="font-family: Georgia, serif; font-size: 22px; color: #2c2420; margin: 10px 0 4px; font-weight: normal;">
        Thank You for Your Order!
      </h2>
      <p style="color: #6b5e54; font-size: 13px; margin: 0;">
        Order ID: <strong style="color: #2c2420;">#${order.orderId}</strong>
      </p>
    </div>

    <p style="color: #6b5e54; font-size: 13px;">
      Hi ${order.shippingAddress.firstName}, we have received your order and our artisans are preparing your jewelry. We will notify you once your order is dispatched.
    </p>

    <!-- Items Table -->
    <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8c7e74; margin: 24px 0 10px;">Order Summary</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px;">
      ${itemsHtml}
      <tr>
        <td style="padding: 8px 0; color: #6b5e54;">Subtotal</td>
        <td align="right" style="padding: 8px 0; color: #2c2420;">₹${order.subtotal.toLocaleString("en-IN")}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b5e54;">Shipping</td>
        <td align="right" style="padding: 8px 0; color: #2c2420;">${order.shippingCost === 0 ? "Free" : `₹${order.shippingCost}`}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b5e54;">GST (3%)</td>
        <td align="right" style="padding: 8px 0; color: #2c2420;">₹${order.tax.toLocaleString("en-IN")}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-top: 2px solid #2c2420; font-size: 15px; font-weight: bold; color: #2c2420;">Total Paid</td>
        <td align="right" style="padding: 12px 0; border-top: 2px solid #2c2420; font-size: 15px; font-weight: bold; color: #2c2420;">₹${order.total.toLocaleString("en-IN")}</td>
      </tr>
    </table>

    <!-- Shipping Address & Info -->
    <div style="background-color: #faf8f5; border: 1px solid #e5dfd8; padding: 16px; margin: 24px 0; border-radius: 4px;">
      <h4 style="margin: 0 0 8px; font-size: 11px; text-transform: uppercase; color: #8c7e74; letter-spacing: 1px;">Shipping Details</h4>
      <p style="margin: 0; color: #2c2420; font-size: 12px; line-height: 1.5;">
        <strong>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</strong><br/>
        ${order.shippingAddress.address}<br/>
        ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}<br/>
        Phone: ${order.shippingAddress.phone}
      </p>
      <p style="margin: 10px 0 0; color: #6b5e54; font-size: 11px;">
        Payment: <strong style="text-transform: uppercase;">${order.paymentMethod}</strong> | Estimated Delivery: <strong>${order.estimatedDelivery || "5-7 business days"}</strong>
      </p>
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${process.env.CLIENT_URL || "http://localhost:3000"}/account" style="display: inline-block; background-color: #2c2420; color: #ffffff; text-decoration: none; padding: 12px 28px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-weight: bold;">
        Track Your Order
      </a>
    </div>
  `;

  return await transporter.sendMail({
    from: FROM_ADDRESS,
    to: order.shippingAddress.email,
    subject: `💎 Order Confirmed #${order.orderId} - Aura Gems`,
    html: wrapTemplate(content),
    text: `Thank you for your order #${order.orderId}! Total: ₹${order.total.toLocaleString("en-IN")}. We are preparing your shipment.`,
  });
};

/**
 * Send Order Status Update Email (Shipped / Delivered / Cancelled)
 */
const sendOrderStatusUpdateEmail = async (order) => {
  const transporter = createTransporter();

  let statusBadgeColor = "#2c2420";
  let statusMessage = `Your order #${order.orderId} status has been updated.`;

  if (order.orderStatus === "shipped") {
    statusBadgeColor = "#1565c0";
    statusMessage = "Your jewelry has been handcrafted and dispatched! It is on its way to you.";
  } else if (order.orderStatus === "delivered") {
    statusBadgeColor = "#2e7d32";
    statusMessage = "Your package has been delivered! We hope you love your new jewelry.";
  } else if (order.orderStatus === "cancelled") {
    statusBadgeColor = "#c62828";
    statusMessage = "Your order has been cancelled. If a refund is due, it will be processed shortly.";
  }

  const content = `
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; background-color: #f7f5f2; color: ${statusBadgeColor}; font-size: 12px; font-weight: bold; padding: 6px 16px; border-radius: 12px; text-transform: uppercase; border: 1px solid ${statusBadgeColor};">
        Status: ${order.orderStatus.toUpperCase()}
      </span>
      <h2 style="font-family: Georgia, serif; font-size: 22px; color: #2c2420; margin: 12px 0 4px; font-weight: normal;">
        Order #${order.orderId} Update
      </h2>
    </div>

    <p style="color: #6b5e54; font-size: 13px; text-align: center;">
      ${statusMessage}
    </p>

    <div style="background-color: #faf8f5; border: 1px solid #e5dfd8; padding: 16px; margin: 24px 0; border-radius: 4px;">
      <p style="margin: 0; font-size: 12px; color: #2c2420;">
        <strong>Recipient:</strong> ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}<br/>
        <strong>Shipping to:</strong> ${order.shippingAddress.city}, ${order.shippingAddress.pincode}<br/>
        <strong>Total Items:</strong> ${order.items.length} piece(s) (₹${order.total.toLocaleString("en-IN")})
      </p>
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${process.env.CLIENT_URL || "http://localhost:3000"}/account" style="display: inline-block; background-color: #2c2420; color: #ffffff; text-decoration: none; padding: 12px 28px; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; font-weight: bold;">
        View Live Tracking
      </a>
    </div>
  `;

  return await transporter.sendMail({
    from: FROM_ADDRESS,
    to: order.shippingAddress.email,
    subject: `📦 Order #${order.orderId} Update: ${order.orderStatus.toUpperCase()} | Aura Gems`,
    html: wrapTemplate(content),
    text: `Your order #${order.orderId} is now ${order.orderStatus.toUpperCase()}. Track live at ${process.env.CLIENT_URL || "http://localhost:3000"}/account`,
  });
};

/**
 * Verify SMTP Transporter Connection
 */
const verifySmtpConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✓ Brevo SMTP Server Connection Verified successfully");
    return true;
  } catch (error) {
    console.error("✗ Brevo SMTP Connection Error:", error.message);
    return false;
  }
};

module.exports = {
  sendOtpEmail,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail,
  sendOrderStatusUpdateEmail,
  verifySmtpConnection,
};
