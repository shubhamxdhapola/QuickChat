import ChatHeader from "./components/chat-header"
import MessageBar from "./components/message-bar"
import MessageContainer from "./components/message-container"

const ChatContainer = () => {

  return (
    
    <div className="flex-1 fixed left-0 md:static bg-base-300 flex justify-center items-center duration-1000 transition-all h-screen md:h-full w-full md:w-[70%] custom-home-1:w-[60%] custom-home-2:w-[45%]">
      <div className="md:h-[93%] h-full w-full bg-base-200 flex flex-col md:rounded-lg overflow-hidden shadow-md" data-aos="fade-right">
        <ChatHeader />
        <MessageContainer /> 
        <MessageBar />
      </div>
    </div>
  )
}

export default ChatContainer
