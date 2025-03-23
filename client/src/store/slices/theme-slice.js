export const createThemeSlice  = (set) => ({
    theme : localStorage.getItem('chat-theme') || 'dark',
    setTheme : (theme) => {
        localStorage.setItem('chat-theme', theme)
        set({theme})
    }
})