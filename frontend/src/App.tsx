import React from 'react';
import Tokens from './components/Tokens';
// import Token from './components/Token';
import Reveal from './components/Reveal';
import './App.css';

const App = () => {
  const [id, setId] = React.useState(1);
  const handleIdChange = React.useCallback((newId: number) => {
    setId(newId);
  }, []);

  return (
    <div className="App p-8">
      <Reveal />
      <Tokens handleIdChange={handleIdChange} />
      {/* <Token id={id} /> */}
    </div>
  );
};

export default App;
