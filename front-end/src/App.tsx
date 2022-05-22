import { HashRouter as Router } from 'react-router-dom';

import './App.scss';

import Header from './Components/Header/Header';
import MainContent from './Components/MainContent/MainContent';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <MainContent />
      </Router>
    </div>
  );
}

export default App;
