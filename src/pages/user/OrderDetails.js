import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetails } from "../../api/api";
import "./OrderDetails.css";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [order, setOrder] = useState(null);

  const fetchDetails = async () => {
  try {
    if (!user?.user_id) return;

    const res = await getOrderDetails(user.user_id, orderId);
    const code = res.data.StatusCode || res.data.statusCode;

    if (code === 200) {
      setOrder(res.data.order);
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
            {/* Order Summary */}
            <div className="orderSummaryCard">
              <div>
                <p className="orderNoText">
                  <b>Order No:</b> {order.order_no}
                </p>
                <p className="orderStatusText">
                  Status: <span className="statusBadge">{order.order_status}</span>
                </p>
              </div>

              <div className="orderTotalBox">
                <p className="totalLabel">Total Amount</p>
                <p className="totalValue">₹ {order.order_total}</p>
              </div>
            </div>

            {/* Tracking Timeline */}
                    <div className="trackCard">
            <h3 className="trackTitle">🚚 Track Order</h3>

            <p className="deliveryText">
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

                    <p className="stepLabel">{s.label}</p>
                    <span className="stepTime">{formatDate(s.time)}</span>
                </div>
                ))}
            </div>
            </div>

            {/* Items */}
            <div className="itemsCard">
              <h3 className="itemsTitle">🧾 Items in this Order</h3>

              <div className="itemsList">
                {order.items?.map((item) => (
                  <div key={item.id} className="itemRow">
                    <img
                      src={item.image_url || "https://via.placeholder.com/80"}
                      alt={item.medicine_name}
                      className="itemImg"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/80")
                      }
                    />

                    <div className="itemInfo">
                      <h4 className="itemName">{item.medicine_name}</h4>
                      <p className="itemMeta">
                        Qty: <b>{item.qty}</b> | Unit: ₹ {item.unit_price}
                      </p>
                      <p className="itemTotal">Total: ₹ {item.total_price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
