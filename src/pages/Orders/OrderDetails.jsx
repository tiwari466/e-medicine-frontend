import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetails } from "../../api/orderApi";
import { useAuth } from "../../context/AuthContext";
import "./OrderDetails.css";


export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

 const { user } = useAuth();

  const [order, setOrder] = useState(null);

  const fetchDetails = async () => {
    try {
      if (!user?.user_id || !orderId) return;

      const res = await getOrderDetails(user.user_id, orderId);

      const code = res.data?.StatusCode || res.data?.statusCode;

      if (code === 200) {
        // ✅ support both shapes
        const orderData = res.data.order || res.data.data || null;
        setOrder(orderData);
      } else {
        setOrder(null);
      }
    } catch (err) {
      console.error("ORDER DETAILS ERROR:", err);
      setOrder(null);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [orderId]);

  const formatDate = (d) => {
    if (!d) return "Not updated";
    return new Date(d).toLocaleString();
  };

  const statusSteps = [
    { key: "Pending", label: "Order Placed", time: order?.placed_time },
    { key: "Shipped", label: "Shipped", time: order?.shipped_time },
    { key: "OutForDelivery", label: "Out for Delivery", time: order?.out_for_delivery_time },
    { key: "Delivered", label: "Delivered", time: order?.delivered_time },
  ];

  const getActiveIndex = () => {
    const s = (order?.order_status || "").toLowerCase();
    if (s.includes("delivered")) return 4;
    if (s.includes("out")) return 3;
    if (s.includes("shipped")) return 2;
    return 1;
  };

  const active = getActiveIndex();

  return (
    <div className="orderDetailsPage">
      <div className="orderDetailsContainer">
        <div className="detailsHeader">
          <button className="backBtn" onClick={() => navigate("/orders")}>
            ← Back
          </button>
          <h2 className="detailsTitle">📦 Order Details</h2>
        </div>

        {!order ? (
          <div className="detailsEmpty">
            <h3>Order not found</h3>
            <p>Please check again.</p>
          </div>
        ) : (
          <>
            {/* SUMMARY */}
            <div className="orderSummaryCard">
              <div>
                <p><b>Order No:</b> {order.order_no}</p>
                <p>
                  Status:{" "}
                  <span className="statusBadge">{order.order_status}</span>
                </p>
              </div>

              <div className="orderTotalBox">
                <p>Total Amount</p>
                <p>₹ {order.order_total}</p>
              </div>
            </div>

            {/* TRACKING */}
            <div className="trackCard">
              <h3>🚚 Track Order</h3>

              <p>
                Expected Delivery:{" "}
                <b>
                  {order.expected_delivery_date
                    ? new Date(order.expected_delivery_date).toDateString()
                    : "N/A"}
                </b>
              </p>

              <div className="timeline">
                {statusSteps.map((s, index) => (
                  <div
                    key={s.key}
                    className={`step ${active >= index + 1 ? "active" : ""}`}
                  >
                    <div className="dot"></div>
                    <p>{s.label}</p>
                    <span>{formatDate(s.time)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ITEMS */}
            <div className="itemsCard">
              <h3>🧾 Items</h3>

              {(order.items || []).map((item) => (
                <div key={item.id} className="itemRow">
                  <img
                    src={item.image_url || "https://via.placeholder.com/80"}
                    alt={item.medicine_name}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/80")
                    }
                  />

                  <div>
                    <h4>{item.medicine_name}</h4>
                    <p>Qty: {item.qty} | ₹ {item.unit_price}</p>
                    <p>Total: ₹ {item.total_price}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
