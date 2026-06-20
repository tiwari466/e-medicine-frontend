import { useState, useEffect } from "react";
import {getProfile,updateProfile,uploadProfilePic} from "../../api/profileApi";
import { useAuth } from "../../context/AuthContext";
import SettingsLayout from "../../components/layout/SettingsLayout";
import toast from "react-hot-toast";
import "./Profile.css";
import { ENV } from "../../config/env";

const BIO_MAX = 200;

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
  });

  const [preview, setPreview] = useState("");
  const [saving, setSaving] =
  useState(false);
  useEffect(() => {
    if (!user) return;
    setForm({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      bio: user.bio || "",
      phone: user.phone || "",
      dob: user.dob || "",
      gender: user.gender || "",
      address: user.address || "",
    });
    if (user.picture) {
       setPreview(
  user.picture.startsWith("http")
    ? user.picture
    : `${ENV.IMAGE_BASE_URL}${user.picture}`
);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "bio" && value.length > BIO_MAX) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleImageChange = async (e) => {

  const file = e.target.files[0];

  if (!file) return;


  setPreview(
    URL.createObjectURL(file)
  );

  try {

    const formData = new FormData();

    formData.append(
  "user_id",
  user.user_id.toString()
);

    formData.append(
      "picture",
      file
    );

    const res =
      await uploadProfilePic(
        formData
      );

    const uploadedPath =
      res.data?.data;

    if (uploadedPath) {

      updateUser({
        ...user,
        picture: uploadedPath,
      });

    setPreview(
  `${ENV.IMAGE_BASE_URL}${uploadedPath}`
);
      toast.success(
        "Profile picture updated"
      );
    }

  } catch (error) {

    console.error(error);

    toast.error(
      "Image upload failed"
    );
  }
};

const handleUpdate = async () => {
  try {
    setSaving(true);

    const res =
      await updateProfile({
        user_id: user.user_id,
        first_name: form.first_name,
        last_name: form.last_name
      });

    if (res.data?.success) {

      updateUser({
        ...user,
        first_name: form.first_name,
        last_name: form.last_name
      });

      toast.success(
        "Profile updated successfully"
      );
    } else {
      toast.error(
        res.data?.message ||
        "Update failed"
      );
    }
  }
  catch (error) {

    console.error(error);

    toast.error(
      "Failed to update profile"
    );
  }
  finally {
    setSaving(false);
  }
};
  if (!user) {
    return <div className="profile-container">User not logged in</div>;
  }

  return (
    <SettingsLayout>
      <div className="profile-container">

        {/* Header */}
        <div className="profile-header">
          <div className="profile-header-text">
            <h1>Edit Profile</h1>
            <p>Manage your personal information and account details</p>
          </div>
         <div className="profileImageWrapper">

  <img
    src={preview || "https://i.pravatar.cc/150"}
    alt="Profile"
  />

  <label
    htmlFor="profileUpload"
    className="upload-btn"
  >
    📷
  </label>

  <input
    id="profileUpload"
    type="file"
    accept="image/*"
    hidden
    onChange={handleImageChange}
  />

</div>
        </div>

        {/* Form */}
        <div className="profile-form">

          {/* Row: First + Last Name */}
          <div className="row2">
            <div className="field">
              <label>
                <span className="field-icon">👤</span> First Name
              </label>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First name"
              />
            </div>
            <div className="field">
              <label>
                <span className="field-icon">👤</span> Last Name
              </label>
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="field">
            <label>
              <span className="field-icon">✏️</span> Bio
            </label>
            <div className="textarea-wrapper">
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell something about yourself"
                maxLength={BIO_MAX}
              />
              <span className="bio-counter">
                {form.bio.length}/{BIO_MAX}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="field">
            <label>
              <span className="field-icon">✉️</span> Email
            </label>
            <input value={form.email} disabled />
          </div>

          {/* Phone */}
          <div className="field">
            <label>
              <span className="field-icon">📞</span> Phone
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          {/* Row: DOB + Gender */}
          <div className="row2">
            <div className="field">
              <label>
                <span className="field-icon">📅</span> Date of Birth
              </label>
              <div className="date-wrapper">
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  placeholder="Select date of birth"
                />
              </div>
            </div>
            <div className="field">
              <label>
                <span className="field-icon">👤</span> Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="action-row">
            <button
              className="cancel-btn"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
           <button
  className="save-btn"
  onClick={handleUpdate}
  disabled={saving}
>
  {saving
    ? "Saving..."
    : "💾 Save Changes"}
</button>
          </div>

        </div>
      </div>
    </SettingsLayout>
  );
}
