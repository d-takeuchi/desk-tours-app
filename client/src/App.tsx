import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { Footer } from "./components/atoms/Footer";
import { Header } from "./components/atoms/Header";
import { Router } from "./routes/Router";
import { AuthProvider } from "./providers/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          toastOptions={{ className: "px-20 py-3 bg-primary text-white" }}
        />
        <Header />
        <Router />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
