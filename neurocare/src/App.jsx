import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login/Login"
import SignUp from "./pages/Sign up/SignIn.Jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
const App = () => {
  return (
   <Router>
    <Routes>
      <Route path="/" element = {<LandingPage />}/>
      <Route path = "/login" element ={<Login />}/>
      <Route path = "/signup" element ={<SignUp /> }/>

    </Routes>
   </Router>
  )
}

export default App
