import  React,{ useState  } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL ;

interface ProductForm {
  name: string;
  price: number;
  description: string;
  stock: number;
}


const AddProduct = () => {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    price: 0,
    description: "",
    stock: 0
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const token = sessionStorage.getItem("token");
    axios
      .post(`${API_BASE}/products/`, form ,{
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(() => {
        alert("Product added!");
        setForm({
          name: "",
          price: 0,
          description: "",
          stock: 0
        });
      })
      .catch(() => {
        alert("Error adding product");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <br/>
      <h1 className="text-3xl font-bold mb-6 text-center">Add Product</h1>

      <label className="block text-sm font-medium text-black mb-1 text-left">Product Name</label>
      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <label className="block text-sm font-medium text-black mb-1 text-left">Price</label>
      <input
        type="text"
        name="price"
        placeholder="100"
        value={form.price}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <label className="block text-sm font-medium text-black mb-1 text-left">Description</label>
      <input
        type="textbox"
        name="description"
        placeholder="this is a product"
        value={form.description}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <label className="block text-sm font-medium text-black mb-1 text-left">Opening Stock</label>
      <input
        type="text"
        name="stock"
        placeholder="6"
        value={form.stock}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <br/>
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded-2xl"
        disabled={submitting}
      >
        {submitting ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProduct;

