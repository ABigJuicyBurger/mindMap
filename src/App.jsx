import "./App.css";
import { Header } from "./components/layout/Header.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { MainContent } from "./components/layout/MainContent.jsx";

// make app small and tidy and easy to read and less scroll

function App() {
  return (
    <div className="app">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
