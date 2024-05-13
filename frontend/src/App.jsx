import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import Signup from "./components/Signup";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import CreateEvent from "./pages/CreateEvent";
import UpdateEvent from "./pages/UpdateEvent";
import Event from "./pages/Event";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn ] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: ""
  })

  useEffect(() => {
    const auth = async () => {
      try {
        const res =  await axios.get("http://localhost:3000/user/check-auth",{withCredentials: true});
        const {email, _id, fullName} = res.data;
        if(res.status === 200){
          setIsLoggedIn(true);
          setUser({
            email,
            id: _id,
            name: fullName
          })
          console.log(res);
        }else{
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.log(error)   
      }
    }

    auth();
  },[])
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-richblack-900">
    <Navbar isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
          <Route path="/events" element={<Events user={user} />} />
          <Route path="/register" element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/user-profile" element={<UserProfile user={user} />} />
          <Route path="/create-event" element={<CreateEvent isLoggedIn={isLoggedIn} />} />
          <Route path="/update-event/:id" element={<UpdateEvent />} />
          <Route path="/event/:id" element={<Event user={user} />} />
        </Routes>
    </div>
  );
}

export default App;
