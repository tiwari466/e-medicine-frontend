import { useState, useEffect } from "react";
import { updateProfile, uploadProfilePic } from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

export default function Profile() {

  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useAuth();


  // ------------------------
  // STATE
  // ------------------------

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    password: "",
  });

  const [preview, setPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);


  // ------------------------
  // LOAD USER INTO FORM
  // ------------------------

useEffect(() => {
  if (user) {
    setForm({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",     // ✅ ADD
      password: "",
    });

    if (user.picture) {
      const pic = user.picture.startsWith("http")
        ? user.picture
        : `http://localhost:5249/profilepics/${user.picture}`;

      setPreview(pic);
    } else {
      setPreview("");
    }
  }
}, [user]);



  // ------------------------
  // GUARD
  // ------------------------

  if (!user) {
    return <div className="profilePage">❌ User not logged in</div>;
  }


  // ------------------------
  // HANDLERS
  // ------------------------

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // AUTO UPLOAD ON SELECT
  const handleFileChange = async (e) => {

    const file = e.target.files?.[0];
    if (!file) return;

    // Preview instantly
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));

    try {

      setUploading(true);

      const formData = new FormData();
      formData.append("picture", file);
      formData.append("user_id", user.user_id);

      const res = await uploadProfilePic(formData);

      if (res.data.success) {

  const imageUrl = `http://localhost:5249/profilepics/${res.data.data}`;

  const updated = {
    ...user,
    picture: imageUrl,
  };

  updateUser(updated);
 setPreview(imageUrl + "?t=" + Date.now());

  alert("✅ Profile picture updated");

} else {
  alert(res.data.message || "❌ Upload failed");
}


    } catch (err) {

      console.error(err);
      alert("❌ Upload failed");

    } finally {
      setUploading(false);
    }
  };


  const handleUpdate = async () => {
    try {

      const payload = {
        user_id: user.user_id,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
      };

      // Send password only if entered
      if (form.password) {
        payload.password = form.password;
      }

      const res = await updateProfile(payload);

      if (res.data.success) {

        updateUser({ ...user, ...payload });

        setForm({
          ...form,
          password: "",
        });

        alert("✅ Profile updated");

      } else {
        alert(res.data.message || "Update failed");
      }

    } catch (err) {
      console.error(err);
      alert("❌ Profile update failed");
    }
  };


  const isActive = (path) => location.pathname === path;


  // ------------------------
  // JSX
  // ------------------------

  return (
    <div className="profilePage">


      {/* SIDEBAR */}
      <div className="profileSidebar">

        <div
          className={isActive("/medicines") ? "profileSideIconActive" : "profileSideIcon"}
          onClick={() => navigate("/medicines")}
        >
          🏠
        </div>

        <div
          className={isActive("/profile") ? "profileSideIconActive" : "profileSideIcon"}
          onClick={() => navigate("/profile")}
        >
          👤
        </div>

        <div
          className={isActive("/cart") ? "profileSideIconActive" : "profileSideIcon"}
          onClick={() => navigate("/cart")}
        >
          🛒
        </div>

        <div
          className={isActive("/orders") ? "profileSideIconActive" : "profileSideIcon"}
          onClick={() => navigate("/orders")}
        >
          📦
        </div>

      </div>



      {/* MAIN CONTENT */}
      <div className="profileContent settingsLayout">


        {/* LEFT MENU */}
        <div className="settingsMenu">

          <h3>Settings</h3>

          <div className="settingsItem active">✏️ Edit Profile</div>
          <div className="settingsItem">🔔 Notification</div>
          <div className="settingsItem">🔐 Security</div>
          <div className="settingsItem">🎨 Appearance</div>
          <div className="settingsItem">❓ Help</div>

        </div>



        {/* RIGHT CARD */}
        <div className="settingsCard">


          {/* HEADER */}
          <div className="settingsHeader">

            <h2>Edit Profile</h2>

            <div className="settingsAvatar">

              <img
                src={preview || "https://i.pravatar.cc/150"}
                alt="profile"
              />

              <label>
                {uploading ? "Uploading..." : "Change"}

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </label>

            </div>

          </div>



          {/* FORM */}
          <div className="settingsForm">


            <div className="row2">

              <div className="field">
                <label>First Name</label>

                <input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </div>


              <div className="field">
                <label>Last Name</label>

                <input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </div>

            </div>



            <div className="field">
              <label>Email</label>

              <div className="emailBox">
                <input value={user.email} disabled />
                <span>✔</span>
              </div>

            </div>



            <div className="field">
              <label>New Password</label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Leave blank if not changing"
              />
            </div>



            {/* ACTIONS */}
            <div className="settingsActions">

              <button
                className="btnCancel"
                onClick={() => window.location.reload()}
                disabled={uploading}
              >
                Cancel
              </button>

              <button
                className="btnSave"
                onClick={handleUpdate}
                disabled={uploading}
              >
                Save
              </button>

            </div>


          </div>

        </div>

      </div>

    </div>
  );
}
