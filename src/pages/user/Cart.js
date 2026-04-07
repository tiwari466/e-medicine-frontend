import { useEffect, useState } from "react";
import { getCartItems, removeCartItem, updateCartQty, placeOrder} from "../../api/api";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

export default function Cart() {
   const storedUser = localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
  const [cartItems, setCartItems] = useState([]);
  const { refreshCartCount } = useCart();

  // ✅ Fetch cart items
  const fetchCart = async () => {
  try {
    if (!user?.user_id) return;

    const res = await getCartItems(user.user_id);

    if (res.data?.success) {
      const list = res.data.data || [];

      setCartItems(list);

      const count = list.reduce(
        (sum, x) => sum + Number(x.qty || 0),
        0
      );

      localStorage.setItem("cartCount", count);
      refreshCartCount();
    }
  } catch (error) {
    console.error("FETCH CART ERROR:", error);
  }
};
  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ Remove item
  const handleRemove = async (cartId) => {
    try {
      const res = await removeCartItem(cartId);
      alert(res.data.StatusMessage || res.data.statusMessage || "Removed");
      fetchCart();
      refreshCartCount();
    } catch (error) {
      console.error("REMOVE ERROR:", error);
      alert("Remove failed");
    }
  };

  // ✅ Update Qty (+ / -)
  const handleQtyChange = async (item, newQty) => {
    try {
      if (newQty < 1) return;

      const payload = {
        id: item.id,
        qty: newQty,
      };

      await updateCartQty(payload);
      fetchCart();
      refreshCartCount();
    } catch (error) {
      console.error("QTY UPDATE ERROR:", error);
      alert("Qty update failed");
    }
  };

  // totals
  const totalItems = cartItems.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  const grandTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.total_price || 0),
    0
  );
const handlePlaceOrder = async () => {
  try {
    if (!user?.user_id) {
      alert("Please login first");
      return;
    }

    const res = await placeOrder({ user_id: user.user_id });

    const statusCode = res?.data?.StatusCode || res?.data?.statusCode;
    const statusMessage = res?.data?.StatusMessage || res?.data?.statusMessage;

    alert(statusMessage || "Order placed successfully ✅");

    // ✅ Only refresh cart if order success
    if (statusCode === 200) {
      await fetchCart();
      refreshCartCount();

      // ✅ Cart badge reset
      localStorage.setItem("cartCount", "0");
    }
  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);
    alert("❌ Failed to place order");
  }
};

  return (
    <div className="cartPage">
      <h2 className="cartTitle">🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <div className="cartEmpty">
          <h3>No items in cart</h3>
          <p>Please add medicines from Medicine List 💊</p>
        </div>
      ) : (
        <div className="cartLayout">
          {/* LEFT SIDE (ITEMS) */}
          <div className="cartLeft">
            {cartItems.map((item) => (
              <div key={item.id} className="cartItemCard">
                <div className="cartItemImgBox">
                  <img
                    src={item.image_url || "https://via.placeholder.com/120"}
                    alt={item.medicine_name}
                    className="cartItemImg"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/120")
                    }
                  />
                </div>

                <div className="cartItemInfo">
                  <h3 className="cartItemName">{item.medicine_name}</h3>

                  <p className="cartItemPrice">
                    ₹ {item.unit_price}{" "}
                    <span className="cartItemDiscount">
                      (Discount: ₹ {item.discount || 0})
                    </span>
                  </p>

                  <div className="cartQtyRow">
                    <button
                      className="qtyBtn"
                      onClick={() => handleQtyChange(item, item.qty - 1)}
                    >
                      -
                    </button>

                    <span className="qtyText">{item.qty}</span>

                    <button
                      className="qtyBtn"
                      onClick={() => handleQtyChange(item, item.qty + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p className="cartItemTotal">Total: ₹ {item.total_price}</p>

                  <button
                    className="removeBtn"
                    onClick={() => handleRemove(item.id)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE (SUMMARY) */}
          <div className="cartRight">
            <div className="summaryCard">
              <h3 className="summaryTitle">PRICE DETAILS</h3>

              <div className="summaryRow">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="summaryRow">
                <span>Total Qty</span>
                <span>{totalItems}</span>
              </div>

              <div className="summaryRow summaryTotal">
                <span>Total Amount</span>
                <span>₹ {grandTotal}</span>
              </div>

              <button className="placeOrderBtn" onClick={handlePlaceOrder}>PLACE ORDER</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
