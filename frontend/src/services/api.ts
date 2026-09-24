import { Product } from "@/data/products";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ProductsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  products: Product[];
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  phone?: string;
  createdAt?: string;
  orderCount?: number;
  totalSpent?: number;
}

export interface AuthResponse {
  success: boolean;
  user: UserProfile;
  token: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  selectedMetal?: string;
}

export interface OrderData {
  _id: string;
  orderId: string;
  user?: { _id: string; name: string; email: string } | null;
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: "upi" | "card" | "netbanking" | "cod";
  paymentStatus: "pending" | "completed" | "failed";
  orderStatus: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderPayload {
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  averageOrderValue: number;
  recentOrders: OrderData[];
  statusCounts: { _id: string; count: number }[];
  paymentCounts: { _id: string; count: number; revenue: number }[];
}

export const api = {
  // Products (Public & Admin)
  async getProducts(params?: { category?: string; search?: string; sortBy?: string; page?: number; limit?: number }): Promise<ProductsResponse> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== "All") query.append("category", params.category);
    if (params?.search) query.append("search", params.search);
    if (params?.sortBy) query.append("sortBy", params.sortBy);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());

    const res = await fetch(`${API_BASE}/products?${query.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async getProductById(id: string): Promise<{ success: boolean; product: Product }> {
    const res = await fetch(`${API_BASE}/products/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Product not found");
    return res.json();
  },

  async getCategories(): Promise<{ success: boolean; categories: string[] }> {
    const res = await fetch(`${API_BASE}/products/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  async createProduct(productData: Partial<Product>, token: string) {
    const res = await fetch(`${API_BASE}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to create product");
    return result;
  },

  async updateProduct(id: string, productData: Partial<Product>, token: string) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update product");
    return result;
  },

  async deleteProduct(id: string, token: string) {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete product");
    return result;
  },

  // Auth & Profile
  async register(data: { name: string; email: string; password: string; phone?: string }): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Registration failed");
    return result;
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Login failed");
    return result;
  },

  async getProfile(token: string) {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  },

  // Orders
  async createOrder(data: OrderPayload, token?: string): Promise<{ success: boolean; message: string; order: OrderData }> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to create order");
    return result;
  },

  async getOrder(orderId: string): Promise<{ success: boolean; order: OrderData }> {
    const res = await fetch(`${API_BASE}/orders/${orderId}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Order not found");
    return res.json();
  },

  async getMyOrders(token: string): Promise<{ success: boolean; count: number; orders: OrderData[] }> {
    const res = await fetch(`${API_BASE}/orders/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch user orders");
    return res.json();
  },

  // Admin Controls
  async getDashboardStats(token: string): Promise<{ success: boolean; stats: DashboardStats }> {
    const res = await fetch(`${API_BASE}/orders/stats/summary`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
  },

  async getAllOrders(token: string): Promise<{ success: boolean; count: number; orders: OrderData[] }> {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch all orders");
    return res.json();
  },

  async updateOrderStatus(
    orderId: string,
    updates: { orderStatus?: string; paymentStatus?: string },
    token: string
  ): Promise<{ success: boolean; message: string; order: OrderData }> {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update order status");
    return result;
  },

  async deleteOrder(orderId: string, token: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/orders/${orderId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete order");
    return result;
  },

  async getAllUsers(token: string): Promise<{ success: boolean; count: number; users: UserProfile[] }> {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  async updateUserRole(userId: string, role: "user" | "admin", token: string) {
    const res = await fetch(`${API_BASE}/users/${userId}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update user role");
    return result;
  },

  async deleteUser(userId: string, token: string) {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete user");
    return result;
  },

  async getUserOrders(userId: string, token: string): Promise<{ success: boolean; count: number; orders: OrderData[]; user: UserProfile }> {
    const res = await fetch(`${API_BASE}/users/${userId}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch user orders");
    return res.json();
  },
};
