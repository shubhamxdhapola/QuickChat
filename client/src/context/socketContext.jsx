import { useAppStore } from "@/store"
import { HOST } from "@/utils/constants"
import { createContext, useContext, useEffect, useRef } from "react"
import { io } from "socket.io-client"

const SocketContext = createContext(null)

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) => {
    const socket = useRef()
    const { userInfo, setActiveUsers, setNewBadge } = useAppStore()

    useEffect(() => {
        if(userInfo) {
            socket.current = io(HOST, {
                withCredentials : true,
                query : {userId : userInfo.id}
            })
            socket.current.on('connect', () => {
                console.log("Connected to socket server")
            })

            const handleReceiveMessage = (message) => {

                const { 
                    selectedChatData, 
                    isChatSelected, 
                    addMessage, 
                    updateDmContactsList, 
                } = useAppStore.getState()
     
                if(isChatSelected && 
                (selectedChatData._id === message.sender._id ||
                selectedChatData._id === message.recipient._id)) {
                    addMessage(message)
                } else {
                    setNewBadge(message.sender._id)
                }
                updateDmContactsList()                
            }

            const getActiveUsers = (activeUsers) => {        
                setActiveUsers(activeUsers)
            }

            socket.current.on('receiveMessage', handleReceiveMessage)
            socket.current.on('getActiveUsers', getActiveUsers)

            return () => {
                socket.current.disconnect()
            }
        }
    }, [userInfo])

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
}
