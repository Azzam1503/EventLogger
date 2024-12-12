import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
<UserContextProvider>
    <App />
</UserContextProvider>
<Toaster/>
</BrowserRouter>);

