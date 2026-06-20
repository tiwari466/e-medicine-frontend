import { useEffect, useMemo, useState } from "react";
import { getMedicines } from "../../api/medicineApi";
import { addToCart } from "../../api/cartApi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./MedicineList.css";

export default function MedicineList() {
  const navigate = useNavigate();
  const { user } = useAuth();                 // ✅ SINGLE SOURCE
  const { cartCount, updateCartCount } = useCart();

  const [medicines, setMedicines] = useState([]);
  const [cartQty, setCartQty] = useState({});
  const [search, setSearch] = useState("");

  // ===============================
  // FETCH MEDICINES
  // ===============================
  const fetchMedicines = async () => {
    try {
     const res = await getMedicines();

      const { success, statusCode, data } = res.data;

      if (success === true && Number(statusCode) === 200 && Array.isArray(data)) {
        setMedicines(data);
      } else {
        setMedicines([]);
      }
    } catch (err) {
      console.error("FETCH MEDICINES ERROR:", err);
      setMedicines([]);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // ===============================
  // SEARCH FILTER
  // ===============================
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

  // ===============================
  // QTY CHANGE
  // ===============================
  const handleQtyChange = (medicineId, value) => {
    setCartQty((prev) => ({
      ...prev,
      [medicineId]: value,
    }));
  };

  // ===============================
  // ADD TO CART (FIXED)
  // ===============================
  const handleAddToCart = async (medicine) => {
    if (!user?.user_id) {
      alert("⚠️ Please login first");
      navigate("/login");
      return;
    }

    try {
      const qty = Number(cartQty[medicine.id] || 1);
      const unit_price = Number(medicine.unit_price || 0);
      const discount = Number(medicine.discount || 0);

      const payload = {
        user_id: user.user_id,
        medicine_id: medicine.id,
        qty,
        unit_price,
        discount,
        total_price: qty * unit_price - discount,
      };

     await addToCart(payload);

updateCartCount(cartCount + qty);

      alert("Added to cart ✅");
    } catch (err) {
      console.error("ADD TO CART ERROR:", err);
      alert("❌ Failed to add to cart");
    }
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="med-page">
      {/* HERO */}
      <div className="med-hero">
        <h2>Say Goodbye to High Medicine Prices 💙</h2>
        <p>Search and order medicines easily with best discounts.</p>

        <div className="med-search">
          <input
            placeholder="Search medicine, manufacturer, uses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={fetchMedicines}>Refresh</button>
        </div>
      </div>

      {/* MEDICINES */}
      <div className="med-content">
        <h3 className="section-title">Available Medicines</h3>

        {filteredMedicines.length > 0 ? (
          <div className="med-grid">
            {filteredMedicines.map((med) => (
              <div key={med.id} className="med-card">
                <img
                  className="med-img"
                  src={
  med.image_url
    ? med.image_url
    : "https://dummyimage.com/400x250/e5e7eb/6b7280&text=Medicine"
}
                  alt={med.medicine_name}
                 onError={(e) => {
 e.target.src =
   "https://dummyimage.com/400x250/e5e7eb/6b7280&text=Medicine";
}}
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
                        handleQtyChange(
                          med.id,
                          Math.max(1, Number(e.target.value))
                        )
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

      <div className="med-footer">
        © {new Date().getFullYear()} E-Medicine | Built with ❤️ by Balmukund Tiwari
      </div>
    </div>
  );
}
