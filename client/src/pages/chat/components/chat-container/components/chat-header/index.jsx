import { useAppStore } from "@/store";
import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constants";

const ChatHeader = () => {

  const { 
    closeChat, 
    selectedChatData, 
    activeUsers 
  } = useAppStore()

  return (
    <div className="border-b-2 border-base-300 flex items-center justify-between px-4 custom-chat-1:px-8 py-2 custom-chat-1:py-3 custom-chat-3:px-4 custom-chat-3:py-2">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative">
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <>
                  <AvatarImage
                    src={selectedChatData.image}
                    alt="profile"
                    className="object-cover w-full h-full bg-black rounded-full relative"
                  />
                  {activeUsers.includes(selectedChatData._id) && (
                    <span
                      className="absolute bottom-0 right-0.5 size-3 bg-green-500 
                      rounded-full ring-1 ring-zinc-900"
                    />
                  )}
                </>
              ) : (
                <div
                  className={`text-base-content uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                  {activeUsers.includes(selectedChatData._id) && (
                    <span
                      className="absolute bottom-0 right-0.5 size-3 bg-green-500 
                      rounded-full ring-1 ring-zinc-900"
                    />
                  )}
                </div>
              )}
            </Avatar>
          </div>
          <div className="text-base-content">
            {selectedChatData.firstName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : selectedChatData.email}
            <div className="text-sm text-base-content/70">
              {activeUsers.includes(selectedChatData._id)
                ? "Active"
                : "Inactive"}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <div
            className="tooltip flex tooltip-left"
            data-tip="Close chat"
            onClick={closeChat}
          >
            <button className="text-base-content focus:border-none focus:outline-none focus:text-white hover:text-base-content/70 hover:scale-105 duration-300 transition-all">
              <RiCloseFill className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
