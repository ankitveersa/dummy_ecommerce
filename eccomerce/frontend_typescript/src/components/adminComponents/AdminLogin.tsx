import  React,{ useState  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL ;

interface CustomerForm {
  username: string;
  password: string;
}

const AdminLogin = () => {
  const [form, setForm] = useState<CustomerForm>({
    username: "",
    password: ""
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(`${API_BASE}/login/`, form)
      .then((res) => {
        const { token } = res.data;
        sessionStorage.setItem("token", token);
        setForm({
          username: "",
          password: ""
        });
        navigate("/");

      })
      .catch((err: any) => {
        if (err.response?.data?.errors?.user?.username) {
            alert(err.response.data.errors.user.username);
        } else if (err.response.data) {
            alert(err.response.data);
        }else {
            alert("Something went wrong");
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
      <div className="mb-5">
        <label htmlFor="username" className="block mb-2 text-sm  text-gray-900 dark:text-gray-900 font-bold">Your Username</label>
        <input 
          type="text" 
          name="username" 
          value={form.username} 
          onChange={handleChange} 
          id="username" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="username" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-gray-950">Your password</label>
        <input 
          type="password"
          placeholder="*****"
          value={form.password}
          onChange={handleChange}
          name="password"
          id="password" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          required />
      </div>

      <button type="submit"
        disabled={submitting} 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {/* <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded w-full"
        disabled={submitting}
      > */}
      
        {submitting ? "Verifying..." : "Login"}
      </button>
      <br></br>
      <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a
            href="/admin/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            REGISTER
          </a>
        </p>
    </form>
  );
};

export default AdminLogin;
