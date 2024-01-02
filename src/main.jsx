import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import GlobalStyles from "./components/GlobalStyles";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalStyles>
    <React.StrictMode>
      <Provider store={store}>
        <GoogleOAuthProvider  clientId="180435041577-101sr0p5i49mneu8v7avbj2gbq6bga0t.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider >
      </Provider>
    </React.StrictMode>
  </GlobalStyles>
);
