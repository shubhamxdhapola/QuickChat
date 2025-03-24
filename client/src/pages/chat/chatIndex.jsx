import { useAppStore } from "@/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
import ChatContainer from "./components/chat-container/chatContainerIndex"
import ContactsContainer from "./components/contacts-container/contactsContainerIndex"
import EmptyChatContainer from './components/empty-chat-container/emptyChatContainerIndex'

const Chat = () => {

  const { 
    userInfo, 
    isChatSelected
  } = useAppStore()

  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'QuickChat - Home'
    if(!userInfo.profileSetUp){
      toast.error("Please setup profile")
      navigate('/profile')
    }
  },[userInfo?.profileSetUp, navigate])

  return (
    <div className="px-2 sm:px-3 md:px-4 2xl:px-7 2xl:rounded-lg bg-base-300 2xl:w-[80vw]">
      <div className="flex h-[100vh] 2xl:h-[80vh] text-white overflow-x-hidden overflow-y-auto gap-2 sm:gap-3 md:gap-4" style={{scrollbarWidth : 'none'}}>
        <ContactsContainer />
        
        {isChatSelected ?  <ChatContainer /> : <EmptyChatContainer /> }
                
      </div>
    </div>
  )
}

export default Chat

