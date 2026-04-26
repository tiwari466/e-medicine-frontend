import { useState, useEffect } from "react";
import { updateProfile, uploadProfilePic } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const BASE_URL = "https://localhost:44302";

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        password: "",
      });

      if (user.picture) {
        const pic = user.picture.startsWith("http")
          ? user.picture
          : `${BASE_URL}${user.picture}`;
        setPreview(pic);
      }
    }
  }, [user]);

  if (!user) return <div>❌ User not logged in</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await updateProfile({
      user_id: user.user_id,
      ...form,
    });

    if (res.data.success) {
      updateUser({ ...user, ...form });
      alert("✅ Profile updated");
    }
  };

 return (
  <div className="settingsCard">

    {/* HEADER */}
    <div className="settingsHeader">
      <h2>Edit Profile</h2>

      <div className="settingsAvatar" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <div className="profileImageWrapper">
          <img src={preview || "/default-avatar.png"} alt="Profile" />
        </div>
      </div>
    </div>

    {/* FORM */}
    <div className="settingsForm">

      {/* NAME */}
      <div className="row2">
        <div className="field">
          <label>First Name</label>
          <input name="first_name" value={form.first_name} onChange={handleChange} />
        </div>

        <div className="field">
          <label>Last Name</label>
          <input name="last_name" value={form.last_name} onChange={handleChange} />
        </div>
      </div>

      {/* BIO */}
      <div className="field">
        <label>Bio</label>
        <textarea placeholder="Tell something about yourself" />
      </div>

      {/* EMAIL */}
      <div className="field">
        <label>Email</label>
        <input value={user.email} disabled />
      </div>

      {/* PHONE */}
      <div className="field">
        <label>Phone</label>
        <input placeholder="Enter phone number" />
      </div>

      <div className="row2">
  <div className="field">
    <label>Date of Birth</label>
    <input type="date" className="customInput" />
  </div>

  <div className="field">
    <label>Gender</label>
    <select className="customInput">
      <option value="">Select</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>
  </div>
</div>

      {/* ADDRESS */}
      <div className="field">
        <label>Address</label>
        <textarea placeholder="Enter your address" />
      </div>

      {/* ACTION */}
      <div className="settingsActions">
        <button className="btnCancel">Cancel</button>
        <button className="btnSave" onClick={handleUpdate}>Save</button>
      </div>

    </div>
  </div>
);
}