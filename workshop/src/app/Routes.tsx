import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from '../App';
import Dashboard from "./Dashboard";
import Register from "./Register";

const Routel = () => {
    return (
        <Router>
          <Routes>
            <Route path='/login' element ={<App/>}/>
            <Route path='/register' element ={<Register/>}/>
            <Route path='/dashboard' element ={<Dashboard/>}/>
          </Routes>
      </Router>
    )
}

export default Routel;
