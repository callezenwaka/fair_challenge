import * as React from 'react';
import Tokens from './components/Tokens';
// import Token from './components/Token';
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import './App.css';
// import Tokens from "./Components/Tokens/Tokens";

const App = () => {
  const [id, setId] = React.useState(1);
  const handleIdChange = React.useCallback((newId) => {
    setId(newId);
  }, []);

  return (
    <div className="App">
      <Tokens handleIdChange={handleIdChange} />
      {/* <Token id={id} /> */}
    </div>
  );
};

export default App;
