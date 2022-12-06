// Imported required dependencies like React, antd for styling, react-dom, react-redux, store
import React from "react";
import 'antd/dist/antd.min.css'
import ReactDOM from "react-dom/client";
import "./dist/index.css";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


reportWebVitals();
