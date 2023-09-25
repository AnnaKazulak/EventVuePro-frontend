import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProviderWrapper } from "./context/auth.context";
import App from "./App.jsx";

import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
