import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layout/Header.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { LessonsPage } from "./pages/LessonsPage.jsx";
import { BrainPage } from "./pages/BrainPage.jsx";
import { BottomNavigation } from "./components/layout/BottomNavigation.jsx";

// make app small and tidy and easy to read and less scroll

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/lessons/:category" element={<LessonsPage />} />
          <Route path="/brain" element={<BrainPage />} />
        </Routes>
        <Footer />
        <BottomNavigation />
      </div>
    </Router>
  );
}

export default App;
