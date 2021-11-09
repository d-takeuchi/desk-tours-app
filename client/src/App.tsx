import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { Footer } from "./components/atoms/Footer";
import { Header } from "./components/atoms/Header";
import { Router } from "./routes/Router";
import { AuthProvider } from "./providers/AuthProvider";
import { LoginUserProvider } from "./providers/LoginUserProvider";

function App() {
  return (
    <BrowserRouter>
      <LoginUserProvider>
        <AuthProvider>
          <Toaster
            toastOptions={{ className: "px-20 py-3 bg-primary text-white" }}
          />
          <Header />
          <Router />
          <Footer />
        </AuthProvider>
      </LoginUserProvider>
    </BrowserRouter>
  );
}

export default App;
