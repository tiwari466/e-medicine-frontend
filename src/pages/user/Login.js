import { useState } from "react";
import { loginUser } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleLogin = async () => {
  try {
    const payload = {
      email: form.email,
      password: form.password,
    };

    const res = await loginUser(payload);

    console.log("LOGIN RESPONSE:", res.data);

    if (res.data?.statusCode === 200) {
      const userData = res.data.data; // ✅ ONLY user object

      // ✅ AuthContext handles localStorage + state
      login(userData);

      // optional: token
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/medicines");
    } else {
      alert("❌ " + (res.data?.message || "Invalid Email or Password"));
    }
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    alert("❌ Backend not reachable / CORS issue");
  }
};


  return (
    <div style={styles.page}>
      {/* Left Side */}
      <div style={styles.left}>
        <div style={styles.brandBox}>
          <div style={styles.logoCircle}>💊</div>
          <h1 style={styles.brandTitle}>E-Medicine</h1>
          <p style={styles.brandDesc}>
            Welcome back! Please login to manage medicines, orders and profile.
          </p>

          <div style={styles.smallLinks}>
            <button style={styles.linkBtn}>What is E-Medicine?</button>
            <button style={styles.linkBtn}>Learn More</button>
          </div>
        </div>
      </div>

      {/* Right Side Login Card */}
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Log In</h2>
          <p style={styles.cardSub}>Enter your username and password</p>

          <div style={styles.inputBox}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div style={styles.inputBox}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div style={styles.row}>
            <label style={styles.remember}>
              <input type="checkbox" /> Remember me
            </label>

            <span style={styles.forgot}>Forgot Password?</span>
          </div>

          <button type="button" style={styles.loginBtn} onClick={handleLogin}>
            Login
          </button>
 
          <p style={styles.signupText}>
            Don’t have an account?{" "}
            <Link to="/register" style={styles.signupLink}>
              Sign up
            </Link>
          </p>

          <p style={styles.adminText}>
            Admin?{" "}
            <Link to="/admin/add-medicine" style={styles.signupLink}>
              Go to Admin Panel
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #2b1b55, #1a0f3d)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    color: "white",
  },

  brandBox: {
    maxWidth: "450px",
  },

  logoCircle: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    marginBottom: "20px",
  },

  brandTitle: {
    fontSize: "42px",
    margin: "0px",
    fontWeight: "bold",
  },

  brandDesc: {
    marginTop: "12px",
    fontSize: "16px",
    opacity: 0.85,
    lineHeight: "24px",
  },

  smallLinks: {
    marginTop: "25px",
    display: "flex",
    gap: "12px",
  },

  linkBtn: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  },

  right: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },

  card: {
    width: "100%",
    maxWidth: "380px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "16px",
    padding: "30px",
    color: "white",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },

  cardTitle: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "bold",
  },

  cardSub: {
    marginTop: "6px",
    marginBottom: "18px",
    opacity: 0.8,
    fontSize: "14px",
  },

  inputBox: {
    marginBottom: "14px",
  },

  label: {
    fontSize: "13px",
    opacity: 0.85,
    display: "block",
    marginBottom: "6px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    outline: "none",
    fontSize: "14px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    fontSize: "13px",
    opacity: 0.85,
  },

  remember: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    cursor: "pointer",
  },

  forgot: {
    cursor: "pointer",
    textDecoration: "underline",
  },

  loginBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #56ccf2, #2f80ed)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
  },

  signupText: {
    marginTop: "16px",
    fontSize: "14px",
    opacity: 0.85,
    textAlign: "center",
  },

  adminText: {
    marginTop: "8px",
    fontSize: "13px",
    opacity: 0.75,
    textAlign: "center",
  },

  signupLink: {
    color: "#56ccf2",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
