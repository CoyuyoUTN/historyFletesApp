
import './App.css';

import ExpenseForm from './components/ExpenseForm';
import NavComponent from './components/NavComponent';
import{Route, BrowserRouter as Router, Routes} from "react-router-dom";
import TableFletes from './components/TableFletes';

function App() {
  return (
    <div id='app' className="App">
    
    <Router>
   <NavComponent/>
      <Routes>
      <Route path='*' element={<ExpenseForm/>}/>
        <Route path='/home' element={<ExpenseForm/>}/>
        <Route path='/table' element={<TableFletes/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
