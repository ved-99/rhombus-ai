import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Wrapper from './components/Wrapper';

function App() {
  return (
    <Router className="App">
      <Wrapper/>
    </Router>
)
}


export default App;
