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

// ==================================================== ADMIN ===================================================
import LayoutAdmin from "./layouts/LayoutAdmin";
import AdminHomePage from "./pages/ADMIN/AdminPage";

//== CUSTOMER ==
import ListCustomerPage from "./pages/ADMIN/Manager_Customer/ListCustomer";
import CreateCustomerPage from "./pages/ADMIN/Manager_Customer/CreateCustomer";
import EditCustomerPage from "./pages/ADMIN/Manager_Customer/EditCustomer";
//== STAFF ==
//== TOUR ==
import ListTourPage from "./pages/ADMIN/Manager_Tour/listTour";
import CreateTourPage from "./pages/ADMIN/Manager_Tour/CreateTour";
//== CUSTOMER ==
//== CUSTOMER ==
//== CUSTOMER ==

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
          path: "managerCus/list",
          element: <ListCustomerPage />,
        },
        {
          path: "managerCus/create",
          element: <CreateCustomerPage />,
        },
        {
          path: "managerCus/edit",
          element: <EditCustomerPage />,
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
