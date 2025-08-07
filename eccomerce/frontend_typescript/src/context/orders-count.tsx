import { createContext } from "react";

interface OrdersCountContextType {
  monthlyOrderCount: number | null;
  setMonthlyOrderCount: (count: number) => void;
}

export const MonthlyOrderCountContext = createContext<OrdersCountContextType>({
  monthlyOrderCount: 0,
  setMonthlyOrderCount: () => {}, 
});
