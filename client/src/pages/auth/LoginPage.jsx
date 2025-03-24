import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { apiClient } from '@/lib/api-client.js'
import { LOGIN_ROUTE } from '@/utils/constants.js'
import { useNavigate, Link } from 'react-router-dom'
import { useAppStore } from '@/store'
import { MessageSquare, Mail, Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import AuthImagePattern from './AuthImagePattern'

const LoginPage = () => {

  useEffect(() => {
    document.title = 'QuickChat - Login'
  },[])
      
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { setUserInfo, isLoggingIn, setIsLoggingIn } = useAppStore()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
        setIsLoggingIn(true)
        const res = await apiClient.post(
          LOGIN_ROUTE, formData
        )
        if(res.status === 200) {
          setIsLoggingIn(false)
          setUserInfo(res.data.user)
          if(res.data.user.profileSetUp) {
            navigate('/chat')
            toast.success("Logged in successfully")
          } else {
            navigate('/profile')
            toast.error("Please setup profile to continue")
          }
        }
    } catch(err) {
        console.log(err)
        toast.error(err.response.data.message)
    } finally {
        setIsLoggingIn(false)
    }
  }
      
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    <div className="flex flex-col justify-center items-center p-6 sm:p-10">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-lg font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60 text-[0.9rem]">
              Sign in to your account
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10 placeholder:text-base-content/60 text-[0.9rem]`}
                placeholder="e.g. johndoe@gmail.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10 placeholder:text-base-content/60 text-[0.9rem]`}
                placeholder="Enter you account password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-base-content/40" />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button className="btn btn-primary w-full" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="text-center text-[0.9rem]">
          <p className="text-base-content/60">
            Don't have an account? {""}
            <Link to="/signup" className="link link-primary">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>

    <AuthImagePattern
      title="Join our community!"
      subtitle="Connect with friends, share moments, and stay in touch with you loved ones."
    />
  </div>
  )
}

export default LoginPage
