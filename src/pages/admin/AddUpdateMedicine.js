import { useState } from "react";
import { addUpdateMedicine } from "../../api/medicineApi";

export default function AddUpdateMedicine() {
  const [medicine, setMedicine] = useState({
    id: 0,
    medicine_name: "",
    manufacturer: "",
    unit_price: "",
    discount: "",
    qty: "",
    disease: "",
    uses: "",
    exp_date: "",
    image_url: "",
    status: "Active",
    type: "Medicine",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...medicine, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addUpdateMedicine(medicine);
      alert(response.data.StatusMessage);
      if (response.data.StatusCode === 200) {
        setMedicine({ ...medicine, id: 0, medicine_name: "", manufacturer: "", unit_price: "", discount: "", qty: "", disease: "", uses: "", exp_date: "", image_url: "", status: "Active" });
      }
    } catch (error) {
      console.error(error);
      alert("Error adding/updating medicine");
    }
  };

  return (
    <div className="container">
      <h2>Add / Update Medicine</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="medicine_name" placeholder="Medicine Name" value={medicine.medicine_name} onChange={handleChange} required />
        <input type="text" name="manufacturer" placeholder="Manufacturer" value={medicine.manufacturer} onChange={handleChange} required />
        <input type="number" name="unit_price" placeholder="Unit Price" value={medicine.unit_price} onChange={handleChange} required />
        <input type="number" name="discount" placeholder="Discount (%)" value={medicine.discount} onChange={handleChange} />
        <input type="number" name="qty" placeholder="Quantity" value={medicine.qty} onChange={handleChange} required />
        <input type="text" name="disease" placeholder="Disease" value={medicine.disease} onChange={handleChange} />
        <input type="text" name="uses" placeholder="Uses" value={medicine.uses} onChange={handleChange} />
        <input type="date" name="exp_date" placeholder="Expiry Date" value={medicine.exp_date} onChange={handleChange} required />
        <input type="text" name="image_url" placeholder="Image URL" value={medicine.image_url} onChange={handleChange} />
        <select name="status" value={medicine.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
