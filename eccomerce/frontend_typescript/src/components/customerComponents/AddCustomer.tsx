import  React,{ useState  } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL ;

interface CustomerForm {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

const AddCustomer = () => {
  const [form, setForm] = useState<CustomerForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: ""
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
      .post(`${API_BASE}/customers/`, form ,{
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(() => {
        alert("Customer added!");
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: ""
        });
      })
      .catch(() => {
        alert("Error adding customer");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>

      <br/>
      <h1 className="text-3xl font-bold mb-6 text-center">Add Customer</h1>

      <label className="block text-sm font-medium text-black mb-1 text-left">First Name</label>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={form.first_name}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <label className="block text-sm font-medium text-black mb-1 text-left">Last Name</label>
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={form.last_name}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <label className="block text-sm font-medium text-black mb-1 text-left">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <label className="block text-sm font-medium text-black mb-1 text-left">Phone Number</label>
      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        value={form.phone_number}
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
        {submitting ? "Adding..." : "Add Customer"}
      </button>
    </form>
  );
};

export default AddCustomer;

