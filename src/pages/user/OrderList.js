import { useEffect, useState } from "react";
import { getUserOrders } from "../../api/api";
import "./OrderList.css";

export default function OrderList() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getUserOrders(user.user_id);

      const code = response.data.StatusCode || response.data.statusCode;
      const list = response.data.listOrders || [];

      if (code === 200) {
        setOrders(list);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("ORDER LIST ERROR:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    if (!status) return "statusPending";
    const s = status.toLowerCase();
    if (s.includes("delivered")) return "statusDelivered";
    if (s.includes("cancel")) return "statusCancelled";
    return "statusPending";
  };

  return (
    <div className="ordersPage">
      <div className="ordersContainer">
        <h2 className="ordersTitle">📦 My Orders</h2>

        {orders.length === 0 ? (
          <div className="ordersEmpty">
            <h3>No orders found</h3>
            <p>Place an order from Cart 💊</p>
          </div>
        ) : (
          <div className="ordersList">
            {orders.map((order) => (
              <div key={order.id} className="orderCard">
                {/* TOP ROW */}
                <div className="orderTopRow">
                  <div>
                    <p className="orderNo">
                      <b>Order:</b> {order.order_no}
                    </p>
                    <p className="orderMeta">
                      <span className="orderAmount">
                        ₹ {order.order_total}
                      </span>
                      <span className={`orderStatus ${getStatusClass(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </p>
                  </div>

                  <button className="trackBtn">
                    Track Order
                  </button>
                </div>

                {/* ITEMS */}
                <div className="orderItems">
                  {order.items?.map((item) => (
                    <div key={item.id} className="orderItemRow">
                      <img
                        src={item.image_url || "https://via.placeholder.com/70"}
                        alt={item.medicine_name}
                        className="orderItemImg"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/70")
                        }
                      />

                      <div className="orderItemInfo">
                        <h4 className="orderItemName">{item.medicine_name}</h4>

                        <p className="orderItemSmall">
                          Qty: <b>{item.qty}</b> | Unit: ₹ {item.unit_price}
                        </p>

                        <p className="orderItemTotal">
                          Total: ₹ {item.total_price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="orderFooter">
                  <span className="helpText">
                    Need help? Contact support
                  </span>

                  <button className="detailsBtn">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
