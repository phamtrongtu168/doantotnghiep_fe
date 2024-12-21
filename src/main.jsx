import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Vô hiệu hóa refetch khi window focus lại
      refetchOnMount: false, // Vô hiệu hóa refetch khi component mount lại
      cacheTime: 30 * 60 * 1000, // Dữ liệu sẽ được giữ trong cache trong 30 phút
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <ToastContainer />
  </React.StrictMode>
);
