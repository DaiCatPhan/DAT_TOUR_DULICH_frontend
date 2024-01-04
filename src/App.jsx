import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header/Header";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

import AuthService from "./services/AuthService";
import { useDispatch } from "react-redux";
import { doLoginAction } from "./redux/account/accountSlide";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <h1>Footer</h1>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();
  const getAccount = async () => {
    const res = await AuthService.fetchProfile();
    if (res && res.data.EC === 0) {
      dispatch(doLoginAction(res.data.DT));
    }
  };
  useEffect(() => {
    getAccount();
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>404 not found</div>,
      children: [
        { index: true, element: <div>HOME PAGE</div> },
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
