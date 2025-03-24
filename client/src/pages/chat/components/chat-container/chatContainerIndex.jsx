import { useAppStore } from "@/store"
import ChatHeader from "./components/chat-header"
import MessageBar from "./components/message-bar"
import MessageContainer from "./components/message-container"
import {LoaderCircle} from 'lucide-react'

const ChatContainer = () => {

  const { isSendingFile, selectedChatData } = useAppStore()
  const selectedChatId = selectedChatData?._id

  return (
    
    <div className="flex-1 fixed left-0 md:static bg-base-300 flex justify-center items-center duration-1000 transition-all h-screen md:h-full w-full md:w-[70%] custom-home-1:w-[60%] custom-home-2:w-[45%]">
      <div className="md:h-[93%] h-full w-full bg-base-200 flex flex-col md:rounded-lg overflow-hidden shadow-md relative" data-aos="fade-right">
        <ChatHeader />
        <MessageContainer /> 
        <MessageBar />
        {selectedChatId && isSendingFile[selectedChatId] && (
          <div className="absolute bottom-20 bg-base-100 text-base-content w-1/3 left-4 rounded-lg border-none alert">
            <LoaderCircle className="animate-spin" />
            <span>Sending File!</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatContainer
