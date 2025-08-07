import  React,{ useState  } from "react";
import axios from "axios";


const API_BASE = import.meta.env.VITE_API_BASE_URL ;

interface CustomerForm {
  username: string;
  email: string;
  password: string;
}

const AdminRegister = () => {
  const [form, setForm] = useState<CustomerForm>({
    username: "",
    email: "",
    password: ""
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(`${API_BASE}/users/`, { user: form })
      .then(() => {
        alert("Admin added!");
        setForm({
          username: "",
          email: "",
          password: ""
        });
      })
      .catch((err: any) => {
        if (err.response?.data?.errors?.user?.username) {
            alert(err.response.data.errors.user.username);
        } else if (err.response?.data) {
            alert(err.response.data);
        }else {
            alert("Something went wrong");
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <form className="max-w-md mx-auto " onSubmit={handleSubmit}>

      <br/>
      <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

      <label className="block text-sm font-medium text-black mb-1 text-left">Username</label>
      <input
        type="text"
        name="username"
        placeholder="username"
        value={form.username}
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

      <label className="block text-sm font-medium text-black mb-1 text-left">Password</label>
      <input
        type="password"
        name="password"
        placeholder="*****"
        value={form.password}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
      />

      <br/>
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded-2xl "
        disabled={submitting}
      >
        {submitting ? "Signing Up..." : "Sign Up"}
      </button>
      <br />
      <p className="text-sm text-center mt-4">
          Have an account?{" "}
          <a
            href="/admin/login"
            className="text-blue-700 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
    </form>
  );
};

export default AdminRegister;

