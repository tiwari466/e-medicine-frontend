import { useState } from "react";
import { registerUser } from "../../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import {
  showSuccess,
  showError,
} from "../../../utils/toast";
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    // ✅ Basic validation
    if (!form.first_name || !form.last_name || !form.email || !form.password) {
      alert("❌ Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("❌ Password and Confirm Password must match");
      return;
    }

    try {
      const payload = {
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    password: form.password,
    picture: "" 
  };

      const res = await registerUser(payload);

      // backend returns: statusCode/statusMessage
      if (res.data?.statusCode === 200) {
        showSuccess("✅ Registered Successfully");
        navigate("/login");
      } else {
        showSuccess("❌ " + (res.data?.statusMessage || "Registration Failed"));
      }
    } catch (err) {
      console.log("REGISTER ERROR:", err);
      showSuccess("❌ Backend not reachable / CORS issue");
    }
  };

  return (
    <div style={styles.page}>
      {/* LEFT PANEL */}
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <div style={styles.logoRow}>
            <div style={styles.logoCircle}>💊</div>
            <div>
              <div style={styles.brandName}>E-Medicine</div>
              <div style={styles.brandSmall}>Online Medicine Portal</div>
            </div>
          </div>

          <h1 style={styles.heading}>E-Medicine Portal</h1>
          <p style={styles.subHeading}>
            Register now to order medicines online, manage your profile, and track your orders easily.
          </p>

          <div style={styles.features}>
            <Feature text="💊 Browse & order medicines" />
            <Feature text="🛒 Add items to cart & checkout" />
            <Feature text="📦 Track your orders anytime" />
            <Feature text="👤 Manage profile & address" />
            <Feature text="🔐 Secure login & access" />
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.right}>
        <div style={styles.card}>
          <div style={styles.cardTopRow}>
            <div style={styles.cardTitle}>Register</div>
            <Link to="/login" style={styles.topLoginBtn}>
              LOGIN
            </Link>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Account Type</label>
            <select style={styles.input} disabled value="User">
              <option>User</option>
            </select>
          </div>

          <div style={styles.grid2}>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <input
                style={styles.input}
                name="first_name"
                placeholder="Enter first name"
                value={form.first_name}
                onChange={handleChange}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <input
                style={styles.input}
                name="last_name"
                placeholder="Enter last name"
                value={form.last_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div style={styles.grid2}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input
                style={styles.input}
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="button" style={styles.registerBtn} onClick={handleRegister}>
            Register →
          </button>

          <p style={styles.bottomText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div style={styles.featureItem}>
      <span>{text}</span>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #0a72b8, #0b3c6f)",
  },

  left: {
    padding: "60px",
    color: "white",
    display: "flex",
    alignItems: "center",
  },

  leftContent: {
    maxWidth: "520px",
  },

  logoRow: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    marginBottom: "30px",
  },

  logoCircle: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.18)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
  },

  brandName: {
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  },

  brandSmall: {
    fontSize: "12px",
    opacity: 0.85,
  },

  heading: {
    fontSize: "56px",
    lineHeight: "62px",
    margin: 0,
    fontWeight: "bold",
  },

  subHeading: {
    marginTop: "14px",
    fontSize: "16px",
    opacity: 0.9,
    lineHeight: "26px",
  },

  features: {
    marginTop: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  featureItem: {
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.18)",
    padding: "12px 14px",
    borderRadius: "14px",
    fontSize: "14px",
    width: "fit-content",
  },

  right: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    background: "rgba(255,255,255,0.10)",
    backdropFilter: "blur(10px)",
  },

  card: {
    width: "100%",
    maxWidth: "520px",
    background: "rgba(255,255,255,0.90)",
    borderRadius: "22px",
    padding: "28px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
  },

  cardTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  cardTitle: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#0a2b4f",
  },

  topLoginBtn: {
    padding: "8px 14px",
    borderRadius: "12px",
    border: "1px solid #d8e6f3",
    background: "#fff",
    color: "#0a72b8",
    fontWeight: "700",
    textDecoration: "none",
    fontSize: "13px",
  },

  formGroup: {
    marginBottom: "14px",
  },

  label: {
    display: "block",
    fontSize: "12px",
    color: "#4a5b6b",
    marginBottom: "6px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid #dbe7f3",
    outline: "none",
    fontSize: "14px",
    background: "#f7fbff",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  registerBtn: {
    marginTop: "8px",
    width: "100%",
    padding: "14px",
    borderRadius: "16px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(90deg, #0a72b8, #0b4f9e)",
    color: "white",
    fontWeight: "800",
    fontSize: "15px",
  },

  bottomText: {
    marginTop: "14px",
    textAlign: "center",
    fontSize: "13px",
    color: "#4a5b6b",
  },

  link: {
    color: "#0a72b8",
    fontWeight: "800",
    textDecoration: "none",
  },
};
