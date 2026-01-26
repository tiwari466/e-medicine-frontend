import { useState } from "react";
import { updateProfile, uploadProfilePic } from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({ ...storedUser });

  // Profile picture upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(storedUser?.picture || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // when user selects file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Upload profile picture
  const handleUploadPicture = async () => {
    try {
      if (!selectedFile) {
        alert("Please select image first");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("user_id", user.user_id);

      const res = await uploadProfilePic(formData);

      alert(res.data.StatusMessage || res.data.statusMessage || "Uploaded");

      if ((res.data.statusCode || res.data.StatusCode) === 200) {
        const picUrl =
          res.data.picture || res.data.fileUrl || res.data.url || "";

        if (!picUrl) {
          alert("Picture URL not returned from API");
          return;
        }

        const updatedUser = { ...user, picture: picUrl };
        setUser(updatedUser);
        setPreview(picUrl);

        // save in localStorage so after logout/login it will show
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.log("UPLOAD ERROR:", error.response?.data || error.message);
      alert("❌ Profile picture upload failed");
    }
  };

  // Update Profile details
  const handleUpdate = async () => {
    try {
      const payload = {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        picture: user.picture,
      };

      const response = await updateProfile(payload);

      alert(response.data.StatusMessage || response.data.statusMessage);

      if (
        response.data.StatusCode === 200 ||
        response.data.statusCode === 200
      ) {
        localStorage.setItem("user", JSON.stringify({ ...user, ...payload }));
      }
    } catch (error) {
      console.error(error);
      alert("Profile update failed");
    }
  };

  // Active sidebar icon
  const isActive = (path) => location.pathname === path;

  return (
    <div className="profilePage">
      {/* LEFT SIDEBAR */}
      <div className="profileSidebar">
        <div
          className={isActive("/medicines") ? "profileSideIconActive" : "profileSideIcon"}
          onClick={() => navigate("/medicines")}
          title="Home"
        >
          🏠
        </div>

        <div
          className={isActive("/profile") ? "profileSideIconActive" : "profileSideIcon"}
          onClick={() => navigate("/profile")}
          title="Profile"
        >
          👤
        </div>

        <div
          className={isActive("/cart") ? "profileSideIconActive" : "profileSideIcon"}
          onClick={() => navigate("/cart")}
          title="Cart"
        >
          🛒
        </div>

        <div
          className={isActive("/orders") ? "profileSideIconActive" : "profileSideIcon"}
          onClick={() => navigate("/orders")}
          title="Orders"
        >
          📦
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="profileContent">
        {/* TOP HEADER */}
        <div className="profileTopHeader">
          <div>
            <h2 className="profileWelcomeText">
              Welcome, {user?.first_name || "User"} 👋
            </h2>
            <p className="profileSubText">Manage your profile details</p>
          </div>

          <div className="profileTopRight">
            <div className="profileSearchBox">
              🔍{" "}
              <input
                placeholder="Search"
                className="profileSearchInput"
              />
            </div>

            <img
              src={preview || user.picture || "https://i.pravatar.cc/150?img=3"}
              alt="profile"
              className="profileTopProfileImg"
            />
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="profileCard">
          {/* TOP BANNER */}
          <div className="profileBanner"></div>

          {/* PROFILE HEADER */}
          <div className="profileHeader">
            <div className="profileLeft">
              <img
                src={preview || user.picture || "https://i.pravatar.cc/150?img=3"}
                alt="profile"
                className="profileBigImg"
              />

              <div>
                <h3 className="profileNameText">
                  {(user.first_name || "") + " " + (user.last_name || "")}
                </h3>
                <p className="profileEmailText">{user.email}</p>

                {/* Upload section */}
                <div className="profileUploadRow">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="profileFileInput"
                  />

                  <button
                    onClick={handleUploadPicture}
                    className="profileUploadBtn"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>

            <button onClick={handleUpdate} className="profileSaveBtn">
              Save
            </button>
          </div>

          {/* FORM */}
          <div className="profileFormGrid">
            <div className="profileField">
              <label className="profileLabel">First Name</label>
              <input
                className="profileInput"
                type="text"
                name="first_name"
                value={user.first_name || ""}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>

            <div className="profileField">
              <label className="profileLabel">Last Name</label>
              <input
                className="profileInput"
                type="text"
                name="last_name"
                value={user.last_name || ""}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>

            <div className="profileField">
              <label className="profileLabel">Email</label>
              <input
                className="profileInput"
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                placeholder="Email"
                disabled
              />
            </div>

            <div className="profileField">
              <label className="profileLabel">Password</label>
              <input
                className="profileInput"
                type="password"
                name="password"
                value={user.password || ""}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
