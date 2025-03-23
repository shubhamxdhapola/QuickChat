export const createAuthSlice = (set) => ({
    
    userInfo : null,
    isLoggingIn : false,
    isSigningUp : false,
    isProfileSetUp : false, 
    isCheckingAuth : true,

    setUserInfo : (userInfo) => set({userInfo}),
    setIsLoggingIn : (isLoggingIn) => set({isLoggingIn}),
    setIsSigningUp : (isSigningUp) => set({isSigningUp}),
    setIsAuthenticated : (isAuthenticated) => set({isAuthenticated}),
    setIsProfileSetUp : (isProfileSetUp) => set({isProfileSetUp}),
    setIsCheckingAuth : (isCheckingAuth) => set({isCheckingAuth}),      
})