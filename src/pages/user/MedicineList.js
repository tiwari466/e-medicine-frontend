import { useEffect, useMemo, useState } from "react";
import { api, addToCart } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./MedicineList.css";

export default function MedicineList() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [medicines, setMedicines] = useState([]);
  const [cartQty, setCartQty] = useState({});
  const [search, setSearch] = useState("");
  const { refreshCartCount } = useCart();
  // Fetch medicines from backend
  const fetchMedicines = async () => {
    try {
      const response = await api.get("/Admin/getMedicines");

      console.log("MEDICINES RESPONSE:", response.data);

      // ✅ Handle both statusCode & StatusCode
      const code = response.data.statusCode || response.data.StatusCode;
      const list = response.data.listMedicines || response.data.ListMedicines || [];

      if (code === 200) {
        setMedicines(list);
      } else {
        setMedicines([]);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
      alert("❌ Error fetching medicines");
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Search filter
  const filteredMedicines = useMemo(() => {
    if (!search.trim()) return medicines;

    return medicines.filter((m) => {
      const name = (m.medicine_name || "").toLowerCase();
      const manu = (m.manufacturer || "").toLowerCase();
      const uses = (m.uses || "").toLowerCase();
      return (
        name.includes(search.toLowerCase()) ||
        manu.includes(search.toLowerCase()) ||
        uses.includes(search.toLowerCase())
      );
    });
  }, [search, medicines]);

  const handleQtyChange = (medicineId, value) => {
    setCartQty({ ...cartQty, [medicineId]: Number(value) });
  };

const handleAddToCart = async (medicine) => {
  if (!user) {
    alert("⚠️ Please login first");
    navigate("/login");
    return;
  }

  try {
    const qty = Number(cartQty[medicine.id] || 1);
    const unit_price = Number(medicine.unit_price || 0);
    const discount = Number(medicine.discount || 0);

    const total_price = qty * unit_price - discount;

    const payload = {
      user_id: Number(user.user_id),
      medicine_id: Number(medicine.id),
      qty,
      unit_price,
      discount,
      total_price,
      medicine_name: medicine.medicine_name,
  image_url: medicine.image_url,
    };
 
    console.log("✅ ADD TO CART PAYLOAD:", payload);

    const response = await addToCart(payload);
    await refreshCartCount();
    alert(
      response.data.StatusMessage ||
        response.data.statusMessage ||
        "Added to cart ✅"
    );
  } catch (error) {
    console.error("❌ Add to cart error:", error.response?.data || error.message);
    alert(
      error.response?.data?.StatusMessage ||
        error.response?.data?.statusMessage ||
        "❌ Failed to add to cart"
    );
  }
};


  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logged out ✅");
    navigate("/login");
  };

  return (
    <div className="med-page">
      {/* Hero */}
      <div className="med-hero">
        <h2>Say Goodbye to High Medicine Prices 💙</h2>
        <p>Search and order medicines easily with best discounts.</p>

        <div className="med-search">
          <input
            placeholder="Search medicine, manufacturer, uses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => fetchMedicines()}>Refresh</button>
        </div>
      </div>

      {/* Banner */}
      <div className="med-banner">
        <div className="banner-card">
          <h3>🚚 Fast Delivery</h3>
          <p>Get medicines quickly at your doorstep.</p>
        </div>
        <div className="banner-card">
          <h3>💰 Best Discounts</h3>
          <p>Save money with offers and discounts.</p>
        </div>
        <div className="banner-card">
          <h3>✅ Trusted Quality</h3>
          <p>Verified medicines from manufacturers.</p>
        </div>
      </div>

      {/* Medicines */}
      <div className="med-content">
        <h3 className="section-title">Available Medicines</h3>

        {Array.isArray(filteredMedicines) && filteredMedicines.length > 0 ? (
          <div className="med-grid">
            {filteredMedicines.map((med) => (
              <div key={med.id} className="med-card">
                <img
                  loading="lazy"
                  className="med-img"
                  src={med.image_url || "https://via.placeholder.com/400x250"}
                  alt={med.medicine_name}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/400x250")}
                />

                <div className="med-body">
                  <h4 className="med-name">{med.medicine_name}</h4>

                  <p className="med-small">
                    Manufacturer: <b>{med.manufacturer}</b>
                  </p>

                  <div className="med-price-row">
                    <span className="price">₹ {med.unit_price}</span>
                    <span className="stock">Stock: {med.qty}</span>
                  </div>

                  <p className="med-uses">
                    <b>Uses:</b> {med.uses}
                  </p>

                  <div className="med-actions">
  <input
    type="number"
    min="1"
    max={med.qty}
    value={cartQty[med.id] || 1}
    onChange={(e) =>
      handleQtyChange(med.id, Math.max(1, Number(e.target.value)))
    }
  />
  <button onClick={() => handleAddToCart(med)}>
    Add to Cart
  </button>
</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="muted">No medicines available</p>
        )}
      </div>

      {/* Footer */}
      <div className="med-footer">
        © {new Date().getFullYear()} E-Medicine | Built with ❤️ in React
      </div>
    </div>
  );
}
