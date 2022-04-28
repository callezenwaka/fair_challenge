import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Tokens, Token, Reveal, Error } from "./components";
import './App.css';

const App = () => {
  // const [id, setId] = useState(1);
  // const handleIdChange = useCallback((newId: number) => {
  //   setId(newId);
  // }, []);

  return (
    <div className="App">
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
