import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

import AuthService from "./services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "./redux/account/accountSlide";

import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

import TourDetail from "./pages/TourDetail";
import Tours from "./pages/Tours";
import ToursTopic from "./pages/ToursTopic";

// == ADMIN ==
import LayoutAdmin from "./layouts/LayoutAdmin";
import AdminHomePage from "./pages/ADMIN/AdminPage";
import DashboardPage from "./pages/ADMIN/DardboradPage";
// == USER ==
import Profile from "./pages/USER/Profile";
import OrderBuy from "./pages/USER/OrderBuy";
import ChangePassword from "./pages/USER/ChangePassword";

//== CUSTOMER ==
import ListCustomerPage from "./pages/ADMIN/Manager_Customer/ListCustomer";

//== STAFF ==
import ListStaffPage from "./pages/ADMIN/Manager_Staff/ListStaff";
//== TOUR ==
import ListTourPage from "./pages/ADMIN/Manager_Tour/listTour";
import CreateTourPage from "./pages/ADMIN/Manager_Tour/CreateTour";
//== CALENDAR ==
import CalendarPage from "./pages/ADMIN/Manager_Calendar/CalendarPage";
//== CATEGORY ==
import List_Caterory from "./pages/ADMIN/Manager_Category/List_Category";
//== VOUCHER ==
import ListVoucher from "./pages/ADMIN/Manager_Voucher/ListVoucher";
// import List_Voucher from "./pages/ADMIN/Manager_Voucher/List_Voucher";
//== BLOG ==
import ListBlogAdmin from "./pages/ADMIN/Manager_Blog/List_Blog";
import BlogDetail from "./pages/Blogs/BlogDetail";
import List_Blog from "./pages/Blogs/List_Blog";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const isLoading = useSelector((state) => state.account.isLoading);

  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      return;
    }

    const res = await AuthService.fetchProfile();

    if (res && res.data.EC === 0) {
      dispatch(doLoginAction(res.data.DT));
    }
  };
  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "tours",
          element: <Tours />,
        },
        {
          path: "tours/:id",
          element: <TourDetail />,
        },
        {
          path: "tours/topic",
          element: <ToursTopic />,
        },
        {
          path: "tours/blogs",
          element: <List_Blog />,
        },
        {
          path: "tours/blogs/:id",
          element: <BlogDetail />,
        },
        {
          path: "info/profile",
          element: <Profile />,
        },
        {
          path: "info/order-buy",
          element: <OrderBuy />,
        },
        {
          path: "info/change-password",
          element: <ChangePassword />,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      // errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            // <ProtectedRoute>
            <AdminHomePage />
            // </ProtectedRoute>
          ),
        },

        {
          path: "dashboard",
          element: <DashboardPage />,
        },

        // CUSTOMER
        {
          path: "managerCus/list",
          element: <ListCustomerPage />,
        },

        // STAFF
        {
          path: "managerStaff/list",
          element: <ListStaffPage />,
        },

        // CATEGORY
        {
          path: "managerCatogory/list",
          element: <List_Caterory />,
        },

        // CALENDAR
        {
          path: "managerCalendar/:id",
          element: <CalendarPage />,
        },

        // TOUR
        {
          path: "managerTour/list",
          element: <ListTourPage />,
        },
        {
          path: "managerTour/create",
          element: <CreateTourPage />,
        },

        // VOUCHER
        {
          path: "managerVoucher/listVoucher",
          element: <ListVoucher />,
        },

        // BLOG
        {
          path: "managerBlog/list",
          element: <ListBlogAdmin />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return (
    <>
      {/* {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname.startsWith("/tours") ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )} */}

      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
