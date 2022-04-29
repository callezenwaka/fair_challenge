import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Tokens, Token, Reveal, Error } from "./components";

const App = () => {

  return (
    <div className="text-center">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Tokens />} />
          <Route path="/reveal" element={<Reveal />} />
          <Route path="/token/:id" element={<Token />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
