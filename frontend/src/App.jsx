import Home from './Home/page'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginAuth from './Login/page';
import RegisterAuth from './Register/page';
const App = () => {
  return (
    <>
    <Router>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<LoginAuth/>}/>
         <Route path="/register" element={<RegisterAuth/>}/>
         <Route path="/cart" element={<Home/>}/>
       </Routes>
    </Router>
    </>
  )
}


export default App;