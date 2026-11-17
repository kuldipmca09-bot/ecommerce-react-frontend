import http from "./http";
import { API, USE_MOCK_DATA } from "../config";

const mock = {
  buyers: [
    { id: 101, name: "Priya Sharma", email: "priya@example.com", phone: "+91 98765 43210", status: "ACTIVE", joined: "2026-10-12" },
    { id: 102, name: "Rahul Verma", email: "rahul@example.com", phone: "+91 98765 12345", status: "ACTIVE", joined: "2026-10-18" },
    { id: 103, name: "Neha Gupta", email: "neha@example.com", phone: "+91 98765 11122", status: "INACTIVE", joined: "2026-11-02" }
  ],
  sellers: [
    { id: 201, name: "Urban Living", email: "hello@urbanliving.in", status: "APPROVED", products: 42, joined: "2026-09-14" },
    { id: 202, name: "TechKart", email: "support@techkart.in", status: "PENDING", products: 18, joined: "2026-11-03" },
    { id: 203, name: "Style House", email: "care@stylehouse.in", status: "SUSPENDED", products: 9, joined: "2026-08-21" }
  ],
  products: [
    { id: 301, name: "Wireless Headphones", sku: "AUD-1001", category: "Electronics", price: 2499, stock: 120, status: "ACTIVE" },
    { id: 302, name: "Smart Watch Pro", sku: "WAT-2002", category: "Electronics", price: 4999, stock: 48, status: "ACTIVE" },
    { id: 303, name: "Everyday Backpack", sku: "BAG-3003", category: "Fashion", price: 1499, stock: 0, status: "OUT_OF_STOCK" },
    { id: 304, name: "Ceramic Coffee Set", sku: "HOM-4004", category: "Home", price: 899, stock: 75, status: "ACTIVE" }
  ],
  listings: [
    { id: 401, seller: "Urban Living", product: "Ceramic Coffee Set", sku: "HOM-4004", price: 849, quantity: 34, status: "ACTIVE" },
    { id: 402, seller: "TechKart", product: "Wireless Headphones", sku: "AUD-1001", price: 2399, quantity: 21, status: "PENDING" },
    { id: 403, seller: "Style House", product: "Everyday Backpack", sku: "BAG-3003", price: 1399, quantity: 0, status: "INACTIVE" }
  ],
  orders: [
    { id: "ORD-1048", buyer: "Priya Sharma", date: "2026-11-17", total: 7498, status: "PROCESSING", items: 2 },
    { id: "ORD-1047", buyer: "Rahul Verma", date: "2026-11-17", total: 2499, status: "SHIPPED", items: 1 },
    { id: "ORD-1046", buyer: "Ananya Rao", date: "2026-11-16", total: 3898, status: "DELIVERED", items: 3 },
    { id: "ORD-1045", buyer: "Vikram Singh", date: "2026-11-15", total: 1499, status: "CANCELLED", items: 1 }
  ]
};

const unwrap = data => Array.isArray(data) ? data : data?.content || data?.data || data?.items || [];
export async function getCollection(type) {
  if (USE_MOCK_DATA) return mock[type] || [];
  const { data } = await http.get(API[type]);
  return unwrap(data);
}
export async function createRecord(type, payload) {
  if (USE_MOCK_DATA) return { id: Date.now(), ...payload };
  const { data } = await http.post(API[type], payload); return data;
}
export async function updateRecord(type, id, payload) {
  if (USE_MOCK_DATA) return { id, ...payload };
  const { data } = await http.put(`${API[type]}/${id}`, payload); return data;
}
export async function deleteRecord(type, id) {
  if (USE_MOCK_DATA) return true;
  await http.delete(`${API[type]}/${id}`); return true;
}
export async function updateStatus(type, id, status) {
  if (USE_MOCK_DATA) return { id, status };
  const { data } = await http.patch(`${API[type]}/${id}/status`, { status }); return data;
}
export { mock };
