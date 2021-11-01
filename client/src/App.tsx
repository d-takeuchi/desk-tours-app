import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { Footer } from "./components/atoms/Footer";
import { Header } from "./components/atoms/Header";
import { Router } from "./routes/Router";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
