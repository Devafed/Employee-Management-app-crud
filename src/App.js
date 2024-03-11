import './App.css';
import {BrowserRouter,Route, Routes} from "react-router-dom";
import EmployeeListing from "./EmployeeListing";
import EmployeeCreate from './EmployeeCreate';
import EmployeeEdit from './EmployeeEdit';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<EmployeeListing/>}></Route>
        <Route path='/employee/create' element={<EmployeeCreate/>}></Route>
        <Route path='/employee/edit/:empid' element={<EmployeeEdit/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
