import 'aos/dist/aos.css';
import AOS from 'aos';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Chat from "./pages/chat/chatIndex";
import Profile from "./pages/profile/ProfileIndex";
import ThemePage from "./pages/theme";

import { useAppStore } from "./store";
import { useEffect, useState } from "react";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants.js";

const PrivateRoute = ({children}) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = userInfo
  return isAuthenticated ? children : <Navigate to="/login" />
}

const AuthLogin = ({children}) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = userInfo
  return isAuthenticated ? <Navigate to="/chat" /> : children
}

const AuthSignup = ({children}) => {
  const { userInfo } = useAppStore()
  const isAuthenticated = userInfo
  const isProfileSetUp = userInfo?.profileSetUp
  if(isAuthenticated && isProfileSetUp) {
    return <Navigate to="/chat" />
  }
  if(isAuthenticated && !isProfileSetUp) {
    return <Navigate to="/profile" />

  }
  return children
}

export function App() {
  
  const [ loading, setLoading ] = useState(true)
  const { userInfo, setUserInfo,  theme } = useAppStore()

  AOS.init({
    offset : -100000,
    duration : 300
  })

  useEffect(() => {
    const getUserData = async () => {
      
      try {
        const response = await apiClient.get(GET_USER_INFO)
        if(response.status === 200 && response.data.id) {
          setUserInfo(response.data)
        } else {
          setUserInfo(null)
        }
      } catch(err) {
        setUserInfo(null)
      } finally {
        setLoading(false)
      }
    }
    if(!userInfo) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [userInfo, setUserInfo])

  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    )
  }

  return (
    <div data-theme={theme} style={{ margin : 'auto'}}>
    <Toaster position="top-center"/>
      <Routes>
        <Route path='/login' element={<AuthLogin><LoginPage /></AuthLogin>} />
        <Route path='/signup' element={<AuthSignup><SignupPage /></AuthSignup>} />
        <Route path='/chat' element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='*' element={<Navigate to="/login" />} />
        <Route path="/theme" element={<ThemePage/>}/>
      </Routes>
    </div>
  )
}

export default App;
