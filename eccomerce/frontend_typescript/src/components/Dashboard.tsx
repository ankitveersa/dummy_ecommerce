import { useEffect ,useState } from "react";

import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  total_sold: number;
}

 
const Dashboard = () => {
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [monthlyOrderCount, setMonthlyOrderCount] = useState<number | null>(null);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);


const fetchMonthlyOrderCount = () => {

       axios.get("http://localhost:8000/api/products/top-selling/" ,{
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        console.log("Top products:", res.data);
        setTopProducts(res.data);
      });
    axios.get("http://localhost:8000/api/orders/count-this-month/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setMonthlyOrderCount(res.data.count);
    })
    .catch((err) => {
      console.error("Error fetching monthly order count:", err);
    });
  }

  const fetchLowStockProducts = () => {
     axios.get("http://localhost:8000/api/products/low-stock/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setLowStockProducts(res.data);
    })
    .catch((err) => {
      console.error("Error fetching low stock products:", err);
    });
  }
  

const fetchTotalRevenue = () => {
  axios.get("http://localhost:8000/api/orders/total-revenue/", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
  .then((res) => {
    setTotalRevenue(res.data.total_revenue);
  })
  .catch((err) => {
    console.error("Failed to fetch total revenue:", err);
  });
}

const fetchTopProducts = () => {
  axios.get("http://localhost:8000/api/products/top-selling/" ,{
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`
      }
    })
      .then(res => {
        console.log("Top products:", res.data);
        setTopProducts(res.data);
      })
      .catch((err) => {
      console.error("Error fetching monthly order count:", err);
      });
 }


  useEffect(() => {
      fetchMonthlyOrderCount();
      fetchLowStockProducts();
      fetchTotalRevenue();
      fetchTopProducts
  }, []);
 
  return (
    <>

    <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <a className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h2 className="text-xl font-semibold mb-2 text-white">Total Revenue</h2>
        <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toFixed(2)}</p>
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <a  className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Total Orders this month
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400" >{monthlyOrderCount !== null ? monthlyOrderCount : "Loading..."}</p>
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 justify-center">
        <a href="#" className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h2 className="text-xl font-semibold mb-2 text-white">Low Stock Products</h2>
          {lowStockProducts.length === 0 ? (
            <p className="text-white">All products have sufficient stock.</p>
          ) : (
            <ul className="list-disc ml-5 text-sm text-red-600 space-y-1">
              {lowStockProducts.map(product => (
                <li key={product.id}>
                  {product.name} – <span className="font-bold">{product.stock} left</span>
                </li>
              ))}
            </ul>
          )}
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <a href="#" className="block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h2 className="text-xl font-semibold mb-2 text-white">Top Selling Products</h2>
          {topProducts.length === 0 ? (
            <p className="text-white">No data available.</p>
          ) : (
            <ul className="space-y-1 text-sm dark:text-gray-400">
              {topProducts.map(product => (
                <li key={product.id}>
                  {product.name} – Sold: <span className="font-bold">{product.total_sold}</span>
                </li>
              ))}
            </ul>
          )}
        </a>
      </div>

    </div>  
    </>
  );
};

export default Dashboard;