"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  api,
  DashboardStats,
  OrderData,
  UserProfile,
} from "@/services/api";
import { Product } from "@/data/products";
import {
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
  FiSearch,
  FiEye,
  FiX,
  FiShield,
  FiArrowLeft,
  FiCheck,
  FiFilter,
  FiTruck,
  FiLogOut,
} from "react-icons/fi";

type AdminTab = "overview" | "orders" | "products" | "users";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [token, setToken] = useState<string>("");
  const [adminUser, setAdminUser] = useState<UserProfile | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Admin login form states (if not logged in as admin)
  const [loginEmail, setLoginEmail] = useState("admin@auragems.com");
  const [loginPassword, setLoginPassword] = useState("adminpassword123");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [actionSuccess, setActionSuccess] = useState("");
  const [actionError, setActionError] = useState("");

  // Search & Filter states
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [userSearch, setUserSearch] = useState("");

  // Modals
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [selectedUserOrders, setSelectedUserOrders] = useState<{
    user: UserProfile;
    orders: OrderData[];
  } | null>(null);
  const [loadingUserOrders, setLoadingUserOrders] = useState(false);

  // Add / Edit Product modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    category: "Rings",
    price: 0,
    originalPrice: 0,
    shortDesc: "",
    fullDesc: "",
    image: "",
    sku: "",
    inStock: true,
    features: "GIA Certified, 18K Gold, Lifetime Warranty",
  });

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    setIsAuthChecking(true);
    try {
      const storedUser = localStorage.getItem("aura-gems-user");
      const storedToken = localStorage.getItem("aura-gems-token");

      if (storedUser && storedToken) {
        const parsed = JSON.parse(storedUser);
        if (parsed.role === "admin") {
          setAdminUser(parsed);
          setToken(storedToken);
          loadAllData(storedToken);
          setIsAuthChecking(false);
          return;
        }
      }
    } catch {}
    setIsAuthChecking(false);
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await api.login({ email: loginEmail, password: loginPassword });
      if (res.user.role !== "admin") {
        setLoginError("Access denied. This account does not have Admin privileges.");
        setLoginLoading(false);
        return;
      }
      localStorage.setItem("aura-gems-user", JSON.stringify(res.user));
      localStorage.setItem("aura-gems-token", res.token);
      setAdminUser(res.user);
      setToken(res.token);
      loadAllData(res.token);
    } catch (err: any) {
      setLoginError(err.message || "Invalid Admin credentials");
    } finally {
      setLoginLoading(false);
    }
  };

  const loadAllData = async (authToken: string) => {
    setLoadingData(true);
    try {
      const [statsRes, ordersRes, productsRes, usersRes] = await Promise.all([
        api.getDashboardStats(authToken).catch(() => ({ stats: null })),
        api.getAllOrders(authToken).catch(() => ({ orders: [] })),
        api.getProducts({ limit: 100 }).catch(() => ({ products: [] })),
        api.getAllUsers(authToken).catch(() => ({ users: [] })),
      ]);

      if (statsRes.stats) setStats(statsRes.stats);
      if (ordersRes.orders) setOrders(ordersRes.orders);
      if (productsRes.products) setProducts(productsRes.products);
      if (usersRes.users) setUsers(usersRes.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setActionError(msg);
      setTimeout(() => setActionError(""), 4000);
    } else {
      setActionSuccess(msg);
      setTimeout(() => setActionSuccess(""), 4000);
    }
  };

  // ORDER ACTIONS
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, { orderStatus: newStatus }, token);
      showNotification(`Order ${orderId} status changed to ${newStatus}`);
      loadAllData(token);
    } catch (err: any) {
      showNotification(err.message || "Failed to update order", true);
    }
  };

  const handleUpdatePaymentStatus = async (orderId: string, newPaymentStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, { paymentStatus: newPaymentStatus }, token);
      showNotification(`Order ${orderId} payment changed to ${newPaymentStatus}`);
      loadAllData(token);
    } catch (err: any) {
      showNotification(err.message || "Failed to update payment status", true);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm(`Are you sure you want to cancel & delete Order #${orderId}?`)) return;
    try {
      await api.deleteOrder(orderId, token);
      showNotification(`Order #${orderId} deleted`);
      loadAllData(token);
      setSelectedOrder(null);
    } catch (err: any) {
      showNotification(err.message || "Failed to delete order", true);
    }
  };

  // PRODUCT ACTIONS
  const handleToggleProductStock = async (product: Product) => {
    try {
      await api.updateProduct(product.id, { inStock: !product.inStock }, token);
      showNotification(`${product.name} is now ${!product.inStock ? "In Stock" : "Out of Stock"}`);
      loadAllData(token);
    } catch (err: any) {
      showNotification(err.message || "Failed to toggle stock", true);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Delete product "${name}" permanently from MongoDB Atlas?`)) return;
    try {
      await api.deleteProduct(id, token);
      showNotification(`Product "${name}" deleted`);
      loadAllData(token);
    } catch (err: any) {
      showNotification(err.message || "Failed to delete product", true);
    }
  };

  const openAddProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      id: "product-" + Date.now().toString(36),
      name: "",
      category: "Rings",
      price: 25000,
      originalPrice: 32000,
      shortDesc: "",
      fullDesc: "",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=750&fit=crop",
      sku: "AG-" + Math.floor(100 + Math.random() * 900),
      inStock: true,
      features: "Natural Gemstone, 18K Gold, Handcrafted in Thailand",
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProductId(product.id);
    setProductForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      shortDesc: product.shortDesc,
      fullDesc: product.fullDesc,
      image: product.image,
      sku: product.sku,
      inStock: product.inStock,
      features: (product.features || []).join(", "),
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: Partial<Product> = {
        id: productForm.id,
        name: productForm.name,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        shortDesc: productForm.shortDesc,
        fullDesc: productForm.fullDesc,
        image: productForm.image,
        images: [productForm.image],
        sku: productForm.sku,
        inStock: productForm.inStock,
        features: productForm.features.split(",").map((f) => f.trim()),
        sizes: ["12", "14", "16", "18"],
        metalOptions: [
          { label: "18K Yellow Gold", color: "#FFD700" },
          { label: "18K White Gold", color: "#E8E8E8" },
        ],
      };

      if (editingProductId) {
        await api.updateProduct(editingProductId, payload, token);
        showNotification(`Product "${productForm.name}" updated successfully`);
      } else {
        await api.createProduct(payload, token);
        showNotification(`Product "${productForm.name}" added to catalog`);
      }
      setIsProductModalOpen(false);
      loadAllData(token);
    } catch (err: any) {
      showNotification(err.message || "Failed to save product", true);
    }
  };

  // USER ACTIONS
  const handleToggleUserRole = async (u: UserProfile) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    if (!confirm(`Change role of ${u.name} from "${u.role}" to "${newRole}"?`)) return;
    try {
      await api.updateUserRole(u._id, newRole, token);
      showNotification(`${u.name} is now ${newRole.toUpperCase()}`);
      loadAllData(token);
    } catch (err: any) {
      showNotification(err.message || "Failed to update role", true);
    }
  };

  const handleDeleteUser = async (u: UserProfile) => {
    if (!confirm(`Delete user "${u.name}" (${u.email})? This action cannot be undone.`)) return;
    try {
      await api.deleteUser(u._id, token);
      showNotification(`User ${u.name} deleted`);
      loadAllData(token);
    } catch (err: any) {
      showNotification(err.message || "Failed to delete user", true);
    }
  };

  const handleInspectUserOrders = async (u: UserProfile) => {
    setLoadingUserOrders(true);
    try {
      const res = await api.getUserOrders(u._id, token);
      setSelectedUserOrders({ user: res.user || u, orders: res.orders || [] });
    } catch (err: any) {
      showNotification(err.message || "Failed to fetch user order history", true);
    } finally {
      setLoadingUserOrders(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("aura-gems-user");
    localStorage.removeItem("aura-gems-token");
    setAdminUser(null);
    setToken("");
    router.push("/");
  };

  // FILTERED LISTS
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.shippingAddress?.firstName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.shippingAddress?.lastName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.shippingAddress?.phone?.includes(orderSearch);
    const matchesStatus = orderStatusFilter === "all" || o.orderStatus === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory =
      productCategoryFilter === "all" || p.category.toLowerCase() === productCategoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const filteredUsers = users.filter((u) => {
    return (
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      (u.phone && u.phone.includes(userSearch))
    );
  });

  // IF NOT AUTHENTICATED AS ADMIN -> SHOW ADMIN GATE LOGIN
  if (!isAuthChecking && !adminUser) {
    return (
      <div className="min-h-screen bg-[#1c1816] flex items-center justify-center p-5">
        <div className="max-w-[420px] w-full bg-white p-8 sm:p-10 shadow-2xl border border-[#c5a47e]/30">
          <div className="text-center mb-8">
            <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[#c5a47e] uppercase block mb-1">
              Store Control Panel
            </span>
            <h1 className="text-[26px] font-serif text-[#2c2420]">Admin Sign In</h1>
            <p className="text-[11px] font-sans text-[#6b5e54] mt-1.5">
              Enter your authorized admin credentials to manage products, orders, and users.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-[12px] font-sans flex items-center gap-2">
              <FiAlertCircle className="shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1 block">
                Admin Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full h-11 px-3.5 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
              />
            </div>
            <div>
              <label className="text-[10px] font-sans font-medium text-[#2c2420] tracking-wide uppercase mb-1 block">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full h-11 px-3.5 text-[12px] font-sans text-[#2c2420] border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full h-11 bg-[#2c2420] text-white text-[11px] font-sans font-medium tracking-[0.12em] uppercase hover:bg-[#1a1614] transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loginLoading ? "Authenticating..." : "Enter Command Center"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#e5dfd8] text-center">
            <Link href="/" className="text-[11px] font-sans text-[#6b5e54] hover:text-[#2c2420] flex items-center justify-center gap-1">
              <FiArrowLeft /> Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f2] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-[#241e1b] text-white sticky top-0 z-40 border-b border-[#3a322d]">
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-[20px] tracking-wide text-white">AURA GEMS</span>
              <span className="bg-[#c5a47e] text-white text-[9px] font-sans font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                Admin Panel
              </span>
            </Link>
            <span className="text-[#6b5e54] hidden md:inline">|</span>
            <span className="text-[11px] text-[#a99c92] hidden md:inline">MongoDB Atlas Live Control</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => loadAllData(token)}
              disabled={loadingData}
              className="text-[#e5dfd8] hover:text-white flex items-center gap-1.5 text-[11px] px-3 py-1.5 border border-[#3a322d] rounded-sm hover:border-[#c5a47e] transition-colors"
              title="Refresh all data"
            >
              <FiRefreshCw className={`text-[12px] ${loadingData ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              href="/"
              className="text-[#c5a47e] hover:text-white text-[11px] hidden sm:flex items-center gap-1 transition-colors"
            >
              View Storefront <FiArrowLeft className="rotate-180 text-[10px]" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-[#e5dfd8] hover:text-red-400 flex items-center gap-1 text-[11px] transition-colors"
              title="Logout"
            >
              <FiLogOut className="text-[13px]" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Alerts */}
      {actionSuccess && (
        <div className="fixed top-20 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded shadow-lg text-[12px] font-sans flex items-center gap-2 animate-bounce">
          <FiCheck className="text-[16px]" />
          <span>{actionSuccess}</span>
        </div>
      )}
      {actionError && (
        <div className="fixed top-20 right-6 z-50 bg-red-600 text-white px-5 py-3 rounded shadow-lg text-[12px] font-sans flex items-center gap-2">
          <FiAlertCircle className="text-[16px]" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-[1500px] mx-auto w-full px-4 sm:px-8 py-6 flex-1">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#e5dfd8] mb-6 gap-2 sm:gap-4 overflow-x-auto pb-1">
          {[
            { key: "overview", label: "Overview & Analytics", icon: FiDollarSign },
            { key: "orders", label: `Orders (${orders.length})`, icon: FiShoppingBag },
            { key: "products", label: `Products (${products.length})`, icon: FiBox },
            { key: "users", label: `Users (${users.length})`, icon: FiUsers },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key as AdminTab)}
                className={`flex items-center gap-2 px-4 py-2.5 text-[12px] font-sans font-medium uppercase tracking-wider transition-all whitespace-nowrap border-b-2 -mb-[2px] ${
                  active
                    ? "border-[#2c2420] text-[#2c2420] bg-white shadow-sm"
                    : "border-transparent text-[#6b5e54] hover:text-[#2c2420]"
                }`}
              >
                <Icon className="text-[14px]" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & ANALYTICS                               */}
        {/* ========================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 border border-[#e5dfd8] shadow-sm">
                <div className="flex items-center justify-between text-[#6b5e54] mb-2">
                  <span className="text-[10px] font-sans uppercase tracking-wider font-semibold">Total Revenue</span>
                  <div className="w-8 h-8 rounded-full bg-[#f8f5f1] flex items-center justify-center text-[#c5a47e]">
                    <FiDollarSign className="text-[16px]" />
                  </div>
                </div>
                <h3 className="text-[24px] font-serif text-[#2c2420] font-light">
                  ₹{(stats?.totalRevenue || 0).toLocaleString("en-IN")}
                </h3>
                <p className="text-[10px] text-[#6b5e54] mt-1">Live from completed and confirmed orders</p>
              </div>

              <div className="bg-white p-5 border border-[#e5dfd8] shadow-sm">
                <div className="flex items-center justify-between text-[#6b5e54] mb-2">
                  <span className="text-[10px] font-sans uppercase tracking-wider font-semibold">Total Orders</span>
                  <div className="w-8 h-8 rounded-full bg-[#f8f5f1] flex items-center justify-center text-[#c5a47e]">
                    <FiShoppingBag className="text-[16px]" />
                  </div>
                </div>
                <h3 className="text-[24px] font-serif text-[#2c2420] font-light">
                  {stats?.totalOrders || orders.length}
                </h3>
                <p className="text-[10px] text-[#6b5e54] mt-1">Processed across platform</p>
              </div>

              <div className="bg-white p-5 border border-[#e5dfd8] shadow-sm">
                <div className="flex items-center justify-between text-[#6b5e54] mb-2">
                  <span className="text-[10px] font-sans uppercase tracking-wider font-semibold">Catalog Products</span>
                  <div className="w-8 h-8 rounded-full bg-[#f8f5f1] flex items-center justify-center text-[#c5a47e]">
                    <FiBox className="text-[16px]" />
                  </div>
                </div>
                <h3 className="text-[24px] font-serif text-[#2c2420] font-light">
                  {stats?.totalProducts || products.length}
                </h3>
                <p className="text-[10px] text-[#6b5e54] mt-1">Live in MongoDB Atlas catalog</p>
              </div>

              <div className="bg-white p-5 border border-[#e5dfd8] shadow-sm">
                <div className="flex items-center justify-between text-[#6b5e54] mb-2">
                  <span className="text-[10px] font-sans uppercase tracking-wider font-semibold">Registered Users</span>
                  <div className="w-8 h-8 rounded-full bg-[#f8f5f1] flex items-center justify-center text-[#c5a47e]">
                    <FiUsers className="text-[16px]" />
                  </div>
                </div>
                <h3 className="text-[24px] font-serif text-[#2c2420] font-light">
                  {stats?.totalUsers || users.length}
                </h3>
                <p className="text-[10px] text-[#6b5e54] mt-1">Customer profiles</p>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="bg-white p-4 border border-[#e5dfd8] flex flex-wrap items-center justify-between gap-3">
              <span className="text-[12px] font-sans text-[#2c2420] font-medium">Quick Actions</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={openAddProductModal}
                  className="h-9 px-4 bg-[#2c2420] text-white text-[11px] font-sans font-medium uppercase tracking-wider hover:bg-[#1a1614] flex items-center gap-1.5 transition-colors"
                >
                  <FiPlus /> Add Jewelry Piece
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="h-9 px-4 border border-[#e5dfd8] text-[11px] font-sans text-[#2c2420] uppercase tracking-wider hover:border-[#2c2420] transition-colors"
                >
                  Manage Orders
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className="h-9 px-4 border border-[#e5dfd8] text-[11px] font-sans text-[#2c2420] uppercase tracking-wider hover:border-[#2c2420] transition-colors"
                >
                  View Users
                </button>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-white border border-[#e5dfd8] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-serif text-[#2c2420]">Recent Platform Orders</h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-[11px] font-sans text-[#c5a47e] hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[12px] font-sans">
                  <thead>
                    <tr className="border-b border-[#e5dfd8] text-[#6b5e54] uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Items</th>
                      <th className="py-2.5 px-3">Total</th>
                      <th className="py-2.5 px-3">Payment</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.orderId} className="border-b border-[#f0ede8] hover:bg-[#faf8f6]">
                        <td className="py-3 px-3 font-semibold text-[#2c2420]">{o.orderId}</td>
                        <td className="py-3 px-3">
                          {o.shippingAddress?.firstName} {o.shippingAddress?.lastName}
                        </td>
                        <td className="py-3 px-3 text-[#6b5e54]">{o.items?.length || 0} item(s)</td>
                        <td className="py-3 px-3 font-medium text-[#2c2420]">₹{o.total.toLocaleString("en-IN")}</td>
                        <td className="py-3 px-3 uppercase text-[10px]">{o.paymentMethod}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold ${
                              o.orderStatus === "delivered"
                                ? "bg-green-100 text-green-800"
                                : o.orderStatus === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {o.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="text-[#c5a47e] hover:text-[#2c2420] font-medium"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-[#6b5e54]">
                          No orders in database yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ORDERS MANAGEMENT                                  */}
        {/* ========================================================= */}
        {activeTab === "orders" && (
          <div className="bg-white border border-[#e5dfd8] p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-[18px] font-serif text-[#2c2420]">All Platform Orders</h3>
                <p className="text-[11px] text-[#6b5e54]">Change order status, payment status, view customer addresses, or cancel orders.</p>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#6b5e54]" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by ID or Name..."
                    className="h-9 pl-8 pr-3 text-[11px] font-sans border border-[#e5dfd8] outline-none focus:border-[#c5a47e] w-[180px] sm:w-[220px]"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="h-9 px-3 text-[11px] font-sans border border-[#e5dfd8] bg-white outline-none focus:border-[#c5a47e]"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[12px] font-sans">
                <thead>
                  <tr className="border-b border-[#e5dfd8] text-[#6b5e54] uppercase text-[10px] tracking-wider bg-[#faf8f6]">
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Customer & Contact</th>
                    <th className="py-3 px-3">Total (₹)</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3">Change Delivery Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o) => (
                    <tr key={o.orderId} className="border-b border-[#f0ede8] hover:bg-[#faf8f6]">
                      <td className="py-3 px-3">
                        <span className="font-semibold text-[#2c2420] block">{o.orderId}</span>
                        <span className="text-[10px] text-[#6b5e54]">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <p className="font-medium text-[#2c2420]">
                          {o.shippingAddress?.firstName} {o.shippingAddress?.lastName}
                        </p>
                        <p className="text-[10px] text-[#6b5e54]">{o.shippingAddress?.phone || o.shippingAddress?.email}</p>
                        <p className="text-[10px] text-[#6b5e54]">{o.shippingAddress?.city}, {o.shippingAddress?.state}</p>
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#2c2420]">
                        ₹{o.total.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={o.paymentStatus}
                          onChange={(e) => handleUpdatePaymentStatus(o.orderId, e.target.value)}
                          className="text-[10px] font-sans font-semibold uppercase px-2 py-1 border border-[#e5dfd8] bg-white rounded-sm outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="failed">Failed</option>
                        </select>
                        <span className="block text-[9px] uppercase text-[#6b5e54] mt-0.5">{o.paymentMethod}</span>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={o.orderStatus}
                          onChange={(e) => handleUpdateOrderStatus(o.orderId, e.target.value)}
                          className={`text-[11px] font-sans font-semibold uppercase px-2.5 py-1.5 border rounded-sm outline-none ${
                            o.orderStatus === "delivered"
                              ? "bg-green-50 border-green-300 text-green-800"
                              : o.orderStatus === "shipped"
                              ? "bg-blue-50 border-blue-300 text-blue-800"
                              : o.orderStatus === "cancelled"
                              ? "bg-red-50 border-red-300 text-red-800"
                              : "bg-amber-50 border-amber-300 text-amber-800"
                          }`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="p-1.5 text-[#6b5e54] hover:text-[#2c2420] transition-colors"
                            title="View full order details"
                          >
                            <FiEye className="text-[15px]" />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(o.orderId)}
                            className="p-1.5 text-[#6b5e54] hover:text-red-600 transition-colors"
                            title="Delete / cancel order"
                          >
                            <FiTrash2 className="text-[14px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-[#6b5e54]">
                        No matching orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PRODUCTS MANAGEMENT                                */}
        {/* ========================================================= */}
        {activeTab === "products" && (
          <div className="bg-white border border-[#e5dfd8] p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-[18px] font-serif text-[#2c2420]">Jewelry Products Catalog</h3>
                <p className="text-[11px] text-[#6b5e54]">Manage prices, toggle stock availability, edit details, or add new items.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={openAddProductModal}
                  className="h-9 px-4 bg-[#2c2420] text-white text-[11px] font-sans font-medium uppercase tracking-wider hover:bg-[#1a1614] flex items-center gap-1.5 transition-colors"
                >
                  <FiPlus /> Add New Piece
                </button>

                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#6b5e54]" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by name or SKU..."
                    className="h-9 pl-8 pr-3 text-[11px] font-sans border border-[#e5dfd8] outline-none focus:border-[#c5a47e] w-[180px]"
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="h-9 px-3 text-[11px] font-sans border border-[#e5dfd8] bg-white outline-none focus:border-[#c5a47e]"
                >
                  <option value="all">All Categories</option>
                  <option value="Rings">Rings</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Pendants">Pendants</option>
                  <option value="Bangles">Bangles</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[12px] font-sans">
                <thead>
                  <tr className="border-b border-[#e5dfd8] text-[#6b5e54] uppercase text-[10px] tracking-wider bg-[#faf8f6]">
                    <th className="py-3 px-3">Item</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">SKU</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">In-Stock Toggle</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="border-b border-[#f0ede8] hover:bg-[#faf8f6]">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-12 h-14 object-cover bg-[#f8f5f1] rounded-sm shrink-0" />
                          <div className="min-w-0">
                            <span className="font-semibold text-[#2c2420] block truncate max-w-[200px]">{p.name}</span>
                            <span className="text-[10px] text-[#6b5e54] line-through">₹{p.originalPrice.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3">{p.category}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-[#6b5e54]">{p.sku}</td>
                      <td className="py-3 px-3 font-semibold text-[#2c2420]">
                        ₹{p.price.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleToggleProductStock(p)}
                          className={`px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1 ${
                            p.inStock
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? "bg-green-600" : "bg-red-600"}`} />
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditProductModal(p)}
                            className="p-1.5 text-[#6b5e54] hover:text-[#2c2420] transition-colors"
                            title="Edit product"
                          >
                            <FiEdit2 className="text-[14px]" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 text-[#6b5e54] hover:text-red-600 transition-colors"
                            title="Delete product"
                          >
                            <FiTrash2 className="text-[14px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-[#6b5e54]">
                        No matching jewelry pieces found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: USERS & CUSTOMER HISTORY                           */}
        {/* ========================================================= */}
        {activeTab === "users" && (
          <div className="bg-white border border-[#e5dfd8] p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-[18px] font-serif text-[#2c2420]">Customer & User Accounts</h3>
                <p className="text-[11px] text-[#6b5e54]">Inspect customer order history, lifetime spend, manage roles, or delete users.</p>
              </div>

              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#6b5e54]" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search user name/email..."
                  className="h-9 pl-8 pr-3 text-[11px] font-sans border border-[#e5dfd8] outline-none focus:border-[#c5a47e] w-[220px]"
                />
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[12px] font-sans">
                <thead>
                  <tr className="border-b border-[#e5dfd8] text-[#6b5e54] uppercase text-[10px] tracking-wider bg-[#faf8f6]">
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Role</th>
                    <th className="py-3 px-3">Orders Placed</th>
                    <th className="py-3 px-3">Lifetime Spend</th>
                    <th className="py-3 px-3">Customer History</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u._id} className="border-b border-[#f0ede8] hover:bg-[#faf8f6]">
                      <td className="py-3 px-3">
                        <p className="font-semibold text-[#2c2420]">{u.name}</p>
                        <p className="text-[11px] text-[#6b5e54]">{u.email}</p>
                        {u.phone && <p className="text-[10px] text-[#6b5e54]">{u.phone}</p>}
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleToggleUserRole(u)}
                          className={`px-2.5 py-0.5 rounded text-[10px] font-sans font-semibold uppercase tracking-wider transition-colors ${
                            u.role === "admin"
                              ? "bg-[#2c2420] text-white"
                              : "bg-[#e5dfd8] text-[#2c2420] hover:bg-[#c5a47e] hover:text-white"
                          }`}
                          title="Click to toggle user/admin role"
                        >
                          {u.role}
                        </button>
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#2c2420]">
                        {u.orderCount || 0} order(s)
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#2c2420]">
                        ₹{(u.totalSpent || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleInspectUserOrders(u)}
                          className="h-8 px-3 border border-[#c5a47e] text-[#c5a47e] hover:bg-[#c5a47e] hover:text-white text-[11px] font-sans font-medium uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
                        >
                          <FiEye className="text-[12px]" />
                          View Orders
                        </button>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {u.email !== "admin@auragems.com" && (
                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="p-1.5 text-[#6b5e54] hover:text-red-600 transition-colors"
                            title="Delete user"
                          >
                            <FiTrash2 className="text-[14px]" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-[#6b5e54]">
                        No matching user accounts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL 1: ORDER DETAILS MODAL                              */}
      {/* ========================================================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-[650px] w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e5dfd8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#e5dfd8] mb-5">
              <div>
                <span className="text-[10px] font-sans text-[#6b5e54] uppercase tracking-wider block">
                  Order Inspection
                </span>
                <h3 className="text-[20px] font-serif text-[#2c2420]">Order #{selectedOrder.orderId}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 flex items-center justify-center text-[#6b5e54] hover:text-[#2c2420]"
              >
                <FiX className="text-[20px]" />
              </button>
            </div>

            {/* Quick Status Control inside Modal */}
            <div className="mb-6 p-4 bg-[#f8f5f1] flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-sans uppercase text-[#6b5e54] block">Delivery Status</span>
                <select
                  value={selectedOrder.orderStatus}
                  onChange={(e) => {
                    handleUpdateOrderStatus(selectedOrder.orderId, e.target.value);
                    setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value as any });
                  }}
                  className="mt-1 h-9 px-3 text-[11px] font-sans font-semibold uppercase bg-white border border-[#e5dfd8] outline-none"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <span className="text-[10px] font-sans uppercase text-[#6b5e54] block">Payment Status</span>
                <select
                  value={selectedOrder.paymentStatus}
                  onChange={(e) => {
                    handleUpdatePaymentStatus(selectedOrder.orderId, e.target.value);
                    setSelectedOrder({ ...selectedOrder, paymentStatus: e.target.value as any });
                  }}
                  className="mt-1 h-9 px-3 text-[11px] font-sans font-semibold uppercase bg-white border border-[#e5dfd8] outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-[12px] font-sans">
              <div className="p-3 bg-[#fcfbfa] border border-[#e5dfd8]">
                <h4 className="text-[10px] font-sans font-semibold uppercase text-[#6b5e54] tracking-wider mb-2">
                  Customer & Contact
                </h4>
                <p className="font-semibold text-[#2c2420]">
                  {selectedOrder.shippingAddress?.firstName} {selectedOrder.shippingAddress?.lastName}
                </p>
                <p className="text-[#6b5e54]">{selectedOrder.shippingAddress?.email}</p>
                <p className="text-[#6b5e54]">{selectedOrder.shippingAddress?.phone}</p>
              </div>

              <div className="p-3 bg-[#fcfbfa] border border-[#e5dfd8]">
                <h4 className="text-[10px] font-sans font-semibold uppercase text-[#6b5e54] tracking-wider mb-2">
                  Shipping Address
                </h4>
                <p className="text-[#2c2420]">{selectedOrder.shippingAddress?.address}</p>
                <p className="text-[#6b5e54]">
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} -{" "}
                  {selectedOrder.shippingAddress?.pincode}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-6">
              <h4 className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#6b5e54]">
                Ordered Items ({selectedOrder.items?.length || 0})
              </h4>
              {selectedOrder.items?.map((it, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-[#f0ede8]">
                  <img src={it.image} alt={it.name} className="w-12 h-14 object-cover bg-[#f8f5f1] rounded-sm" />
                  <div className="flex-1">
                    <p className="text-[12px] font-serif text-[#2c2420]">{it.name}</p>
                    <p className="text-[10px] text-[#6b5e54]">
                      {it.selectedMetal} | {it.selectedSize} | Qty: {it.quantity}
                    </p>
                  </div>
                  <span className="text-[12px] font-semibold text-[#2c2420]">
                    ₹{(it.price * it.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-[#f8f5f1] text-[12px] font-sans space-y-1.5 mb-6">
              <div className="flex justify-between text-[#6b5e54]">
                <span>Subtotal</span>
                <span>₹{selectedOrder.subtotal?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[#6b5e54]">
                <span>Shipping Cost</span>
                <span>{selectedOrder.shippingCost === 0 ? "Free" : `₹${selectedOrder.shippingCost}`}</span>
              </div>
              <div className="flex justify-between text-[#6b5e54]">
                <span>Tax (3% GST)</span>
                <span>₹{selectedOrder.tax?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[14px] font-semibold text-[#2c2420] pt-2 border-t border-[#e5dfd8]">
                <span>Grand Total</span>
                <span>₹{selectedOrder.total?.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => handleDeleteOrder(selectedOrder.orderId)}
                className="text-red-600 hover:text-red-800 text-[11px] font-sans uppercase font-medium flex items-center gap-1"
              >
                <FiTrash2 /> Cancel & Delete Order
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="h-10 px-6 bg-[#2c2420] text-white text-[11px] font-sans font-medium uppercase tracking-wider hover:bg-[#1a1614]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: USER ORDERS HISTORY INSPECTION                   */}
      {/* ========================================================= */}
      {selectedUserOrders && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-[700px] w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e5dfd8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#e5dfd8] mb-5">
              <div>
                <span className="text-[10px] font-sans text-[#6b5e54] uppercase tracking-wider block">
                  Customer Purchase History
                </span>
                <h3 className="text-[20px] font-serif text-[#2c2420]">
                  {selectedUserOrders.user.name} ({selectedUserOrders.user.email})
                </h3>
              </div>
              <button
                onClick={() => setSelectedUserOrders(null)}
                className="w-8 h-8 flex items-center justify-center text-[#6b5e54] hover:text-[#2c2420]"
              >
                <FiX className="text-[20px]" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {selectedUserOrders.orders.map((ord) => (
                <div key={ord.orderId} className="p-4 border border-[#e5dfd8] bg-[#fcfbfa]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#f0ede8] mb-3 text-[12px] font-sans">
                    <span className="font-semibold text-[#2c2420]">Order #{ord.orderId}</span>
                    <span className="text-[11px] text-[#6b5e54]">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                    <span className="font-bold text-[#2c2420]">₹{ord.total.toLocaleString("en-IN")}</span>
                    <span
                      className={`px-2 py-0.5 text-[9px] font-semibold uppercase rounded-full ${
                        ord.orderStatus === "delivered" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {ord.orderStatus}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {ord.items.map((it, i) => (
                      <div key={i} className="flex justify-between text-[11px] text-[#6b5e54]">
                        <span>• {it.name} (Qty: {it.quantity})</span>
                        <span>₹{(it.price * it.quantity).toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {selectedUserOrders.orders.length === 0 && (
                <div className="text-center py-10 text-[#6b5e54] text-[12px]">
                  This user has not placed any orders yet.
                </div>
              )}
            </div>

            <div className="text-right">
              <button
                onClick={() => setSelectedUserOrders(null)}
                className="h-10 px-6 bg-[#2c2420] text-white text-[11px] font-sans font-medium uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ADD / EDIT PRODUCT MODAL                         */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white max-w-[600px] w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e5dfd8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#e5dfd8] mb-5">
              <h3 className="text-[20px] font-serif text-[#2c2420]">
                {editingProductId ? "Edit Jewelry Piece" : "Add New Jewelry Piece"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#6b5e54] hover:text-[#2c2420]"
              >
                <FiX className="text-[20px]" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-[12px] font-sans">
              <div>
                <label className="text-[10px] font-semibold uppercase text-[#2c2420] block mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                  placeholder="e.g. Royal Emerald Pendant"
                  className="w-full h-10 px-3 border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase text-[#2c2420] block mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full h-10 px-3 border border-[#e5dfd8] bg-white outline-none focus:border-[#c5a47e]"
                  >
                    <option value="Rings">Rings</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Pendants">Pendants</option>
                    <option value="Bangles">Bangles</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase text-[#2c2420] block mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    required
                    placeholder="e.g. AG-RNG-099"
                    className="w-full h-10 px-3 border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase text-[#2c2420] block mb-1">
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    required
                    className="w-full h-10 px-3 border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase text-[#2c2420] block mb-1">
                    Original Price / MRP (₹)
                  </label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    required
                    className="w-full h-10 px-3 border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase text-[#2c2420] block mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full h-10 px-3 border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase text-[#2c2420] block mb-1">
                  Short Description
                </label>
                <input
                  type="text"
                  value={productForm.shortDesc}
                  onChange={(e) => setProductForm({ ...productForm, shortDesc: e.target.value })}
                  placeholder="One-line summary"
                  className="w-full h-10 px-3 border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase text-[#2c2420] block mb-1">
                  Full Description
                </label>
                <textarea
                  value={productForm.fullDesc}
                  onChange={(e) => setProductForm({ ...productForm, fullDesc: e.target.value })}
                  rows={3}
                  placeholder="Detailed craftsmanship and gemstone details"
                  className="w-full p-3 border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold uppercase text-[#2c2420] block mb-1">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={productForm.features}
                  onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                  placeholder="GIA Certified, 18K Gold, Comfort Fit"
                  className="w-full h-10 px-3 border border-[#e5dfd8] outline-none focus:border-[#c5a47e]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={productForm.inStock}
                  onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                  className="accent-[#c5a47e]"
                />
                <label htmlFor="inStockCheck" className="text-[12px] text-[#2c2420] cursor-pointer">
                  Item is currently in stock and available for purchase
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#e5dfd8]">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="h-10 px-5 border border-[#e5dfd8] text-[11px] uppercase text-[#6b5e54]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-6 bg-[#2c2420] text-white text-[11px] uppercase tracking-wider hover:bg-[#1a1614]"
                >
                  Save Piece to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
