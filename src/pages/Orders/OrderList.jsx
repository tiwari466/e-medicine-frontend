import { useEffect, useState } from "react";
import {
 getUserOrders,
 cancelOrder,
 downloadInvoice
} from "../../api/orderApi";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./OrderList.css";



export default function OrderList() {

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const getUserId = () =>
    user?.user_id ?? user?.userId;

  // ================= FETCH ORDERS =================
  const fetchOrders = async () => {
    try {

      const userId = getUserId();

      console.log("👤 USER:", user);
      console.log("🆔 USER ID USED:", userId);

      if (!userId) {
        console.warn("❌ INVALID USER ID");
        setOrders([]);
        return;
      }

      const res = await getUserOrders(userId);

      console.log("📦 ORDER API RESPONSE:", res.data);

      if (res.data?.success && Array.isArray(res.data.data)) {
        setOrders(res.data.data);
      } else {
        console.warn("❌ No valid orders data");
        setOrders([]);
      }

    } catch (error) {
      console.error("❌ ORDER LIST ERROR:", error);
      setOrders([]);
    }
  };

  // ================= LOAD =================
  useEffect(() => {
    if (getUserId()) {
      fetchOrders();
    }
  }, [user]);

  // ================= STATUS CLASS =================
  const getStatusClass = (status) => {

    if (!status) return "statusPending";

    const s = status.toLowerCase();

    if (s.includes("delivered")) return "statusDelivered";
    if (s.includes("cancel")) return "statusCancelled";

    return "statusPending";
  };

  // ================= CANCEL =================
  const handleCancel = async (orderId) => {

    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {

      const userId = getUserId();

      const res = await cancelOrder({
        user_id: userId,
        order_id: orderId,
      });

      alert(res.data?.message || "Order cancelled");

      fetchOrders();

    } catch (err) {
      console.error("❌ CANCEL ERROR:", err);
      alert("Cancel failed");
    }
  };

  // ================= INVOICE =================
  const handleInvoice = async (orderId) => {

    try {

      const userId = getUserId();

      const res = await downloadInvoice(userId, orderId);

      const blob = new Blob([res.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `Invoice_${orderId}.pdf`;

      link.click();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("❌ INVOICE ERROR:", err);
      alert("Invoice download failed");
    }
  };

  // ================= UI =================
  return (
    <div className="ordersPage">

      <h2>📦 My Orders</h2>

      {!getUserId() ? (
        <div className="ordersEmpty">
          <h3>Please login first</h3>
        </div>
      ) : orders.length === 0 ? (

        <div className="ordersEmpty">
          <h3>No orders found</h3>
          <p>Place an order from Cart 💊</p>
        </div>

      ) : (

        orders.map((order) => (

          <div key={order.order_id} className="orderCard">

            <div className="orderTopRow">

              <div>
                <p><b>Order:</b> {order.order_no}</p>

                <p>
                  ₹ {order.order_total}{" "}
                  <span className={getStatusClass(order.order_status)}>
                    {order.order_status}
                  </span>
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/order-details/${order.order_id}`)
                }
              >
                Track
              </button>

              <button
                onClick={() => handleInvoice(order.order_id)}
              >
                Invoice
              </button>

              {order.order_status !== "Delivered" &&
               order.order_status !== "Cancelled" && (

                <button
                  onClick={() => handleCancel(order.order_id)}
                >
                  Cancel
                </button>

              )}

            </div>

          </div>

        ))
      )}

    </div>
  );
}