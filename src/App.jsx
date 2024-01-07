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
import AdminHomePage from "./pages/ADMIN/AdminPage";
import HomePage from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

import LayoutAdmin from "./layouts/LayoutAdmin";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

// const LayoutAdmin = () => {
//   const isAdminRoute = window.location.pathname.startsWith("/admin");
//   const user = useSelector((state) => state.account.user);
//   const userRole = user.role;

  
//   return (
//     <div>
//       {isAdminRoute && userRole === "admin" && <h1>Header Admin</h1>}
//       <Outlet />
//       {isAdminRoute && userRole === "admin" && <h1>Footer Admin</h1>}
//     </div>
//   );
// };

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
    console.log("res fetchProfile", res);
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
          element: <div>TOUR</div>,
        },
        {
          path: "tours/:id",
          element: <div>TOUR DETAIL</div>,
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
          path: "contact",
          element: <div>CONTACT PAGE</div>,
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
