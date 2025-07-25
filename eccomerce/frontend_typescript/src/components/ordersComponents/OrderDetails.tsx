import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";


// const navigate = useNavigate();

interface Product {
  id: number;
  name: string;
  price: string; // received as string from backend
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  customer_id: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const OrderDetails: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  useEffect(() => {

    fetchOrders();
  }, []);

  const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/orders/", {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          }
        });
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setUpdatingStatusId(orderId);

    axios.patch(
      `http://localhost:8000/api/orders/${orderId}/`,
      { status: newStatus },
      {
        headers: { Authorization: `Token ${sessionStorage.getItem("token")}` },
      }
    )
      .then(() => {
        alert("Order updated successfully!");
        fetchOrders(); // Refresh the order list
      })
      .catch((err) => {
        console.error("Error updating order:", err);
        alert("Failed to update order.");
      })
      .finally(() => {
        setUpdatingStatusId(null);
      });
  };
  const getNextStatuses = (currentStatus: string): string[] => {
    const transitions: { [key: string]: string[] } = {
      PENDING: ["PENDING", "PROCESSING", "CANCELED"],
      PROCESSING: ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"],
      SHIPPED: ["SHIPPED", "DELIVERED"],
      DELIVERED: ["DELIVERED"],
      CANCELED: ["CANCELED"],
    };
    return transitions[currentStatus] || [currentStatus];
  };



  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.price);
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded p-4 mb-4 shadow-md bg-white"
          >
            <div className="mb-2">
              <strong>Order ID:</strong> {order.id}
            </div>
            <div className="mb-2">
              <strong>Customer ID:</strong> {order.customer_id}
            </div>
            <div className="mb-2">
              <strong>Order Date:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </div>

            <table className="w-full text-left mt-2 border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-1 border">Product</th>
                  <th className="px-2 py-1 border">Price</th>
                  <th className="px-2 py-1 border">Quantity</th>
                  <th className="px-2 py-1 border">Subtotal</th>
                  <th className="px-2 py-1 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-1 border">{item.product.name}</td>
                    <td className="px-2 py-1 border">₹{item.product.price}</td>
                    <td className="px-2 py-1 border">{item.quantity}</td>
                    <td className="px-2 py-1 border">
                      ₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-2 py-1 border">
                      {/* {order.status}{" "} {"    "} */}
                      <select
                        value={order.status}
                        disabled={updatingStatusId === order.id}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="border p-1 rounded gap-1.5 m-2"
                      >
                        {getNextStatuses(order.status).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right font-semibold mt-2">
              Total: ₹{calculateTotal(order.items).toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderDetails;
