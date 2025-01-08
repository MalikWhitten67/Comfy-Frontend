 

import { useState } from 'vaderjs' 
import api from '../../../src/api'
  
export default function AuthFlow() {
  const [step, setStep] = useState('email')
  const [forgotPassword, setForgotPassword] = useState(false)
  const [userData, setUserData] = useState({
    emailVisibility: true,
    addresses: [],
  })
  const [loading, setLoading] = useState(false)

  // Placeholder function to check if user exists
  const checkUserExists = async (email) => { 
    setLoading(true)
     try { 
      var u = await api.collection("users").getList(1,1, {
        filter:`email="${email}"`
      }) 
      setLoading(false)
      return u.items.length > 0
     } catch (error) {
       console.log(error)
       setLoading(false)
       return false
     }
  }

  const handleEmailSubmit = async (e ) => { 
    e.preventDefault() 
    setLoading(true)
    if(forgotPassword){
      try {
        await api.collection("users").requestPasswordReset(userData.email)
        setStep('reset')
      } catch (error) {
        alert('Error resetting password:', error)
      } finally {
        setLoading(false)
      }
    }
    else{
      try {
        const userExists = await checkUserExists(userData.email)
        setStep(userExists ? 'login' : 'signup')
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setLoading(false)
      }
    }
    
  }

  const handleLoginSubmit = async (e ) => {
    e.preventDefault() 
    setLoading(true)
    try { 
      await api.collection("users").authWithPassword(userData.email, userData.password)
      window.location.href = '/'
    } catch (error) {
       alert('Error logging in:', error)
       setLoading(false)
    }
  }

  const handleSignupSubmit = async (e ) => {
    e.preventDefault() 
    setLoading(true)
    try {
      await api.collection("users").create(userData)
      await api.collection("users").authWithPassword(userData.email, userData.password)
      window.location.href = '/'
    } catch (error) {
       alert('Error signing up:', error)
       setLoading(false)
    }
  }

  return (
    <html>
      <head>
        <title>Confy - Title</title>
        <meta name="description" content="Comfy - One of One" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
      <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-4 py-8">
        {/* Logo */}
        <div className="mb-8 flex justify-center gap-2 shrikhand-regular text-xl">
           Comfy
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-medium">
              {
                forgotPassword ? 'Enter your email to reset your password' : step === 'email' || step === "login" ? 'Welcome back! Enter your email to continue.' : 'Create an account'
              }
            </h1>
          </div>

          {/* Country Selector */}
          {
            !forgotPassword && (
            <div className="flex items-center justify-between">
              <span>Country</span>
              <select className="text-gray-500" onChange={(e) => setUserData({ ...userData, country: e.target.value })}>
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
            )
          }
          {
            step === 'reset' && (
              <p className="text-center text-sm text-gray-500">
                We have sent you an email with instructions to reset your password.
                the link was sent to {userData.email}
              </p>
            )
          }

          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Email"
                  value={userData.email || ''}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full rounded-none border-x-0 border-t-0 border-b focus:outline-none border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
              <button
                type="submit" 
                className="w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800 "
              >
                {loading && !forgotPassword ? 'Checking...' : forgotPassword ? 'Reset Password' : 'Continue'}
              </button>
            </form>
          )}

          {step === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Password"
                  value={userData.password || ''}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  className="w-full rounded-none border-x-0 border-t-0 border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          )}

          {step === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  required
                  placeholder="Username"
                  value={userData.username || ''}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  className="w-full rounded-none border-x-0 border-t-0 border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label htmlFor="dob" className="sr-only">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  required
                  value={userData.dob || ''}
                  onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                  className="w-full rounded-none border-x-0 border-t-0 border-b border-gray-300 px-0 py-2 text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label htmlFor="signup-password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  required
                  placeholder="Password"
                  value={userData.password || ''}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  className="w-full rounded-none border-x-0 border-t-0 border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  required
                  placeholder="Confirm Password"
                  value={userData.confirmPassword || ''}
                  onChange={(e) => setUserData({ ...userData, passwordConfirm: e.target.value })}
                  className="w-full rounded-none border-x-0 border-t-0 border-b border-gray-300 px-0 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800"
              >
                Sign Up
              </button>
            </form>
          )}

          <button className="text-center text-sm text-gray-500 hover:underline" onClick={() => {
            setStep('email')
            setForgotPassword(!forgotPassword)
          }}>
            Forgot your password?
          </button>

          <p className="text-center text-sm text-gray-500">
            By continuing, I agree to Comfy's{' '}
            <button className="underline">Privacy Policy</button> and{' '}
            <button className="underline">Terms of Use</button>.
          </p>
        </div>
      </div>
    </div>
      </body>
    </html>
  )
}

