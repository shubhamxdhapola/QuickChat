import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import { useEffect, useRef, useState } from "react";
import { SmilePlus, Paperclip, SendHorizontal, LoaderCircle } from "lucide-react";
import { useSocket } from "@/context/socketContext";
import { useAppStore } from "@/store";
import { apiClient } from "@/lib/api-client";
import EmojiPicker from "emoji-picker-react";

const MessageBar = () => {
  const emojiRef = useRef(null);
  const socket = useSocket();
  const fileInputRef = useRef();

  const {
    selectedChatData,
    userInfo,
    setIsSendingFile,
    updateDmContactsList,
  } = useAppStore();

  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function removeEmojiPicker(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", removeEmojiPicker);
    return () => {
      document.removeEventListener("mousedown", removeEmojiPicker);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };
  const handleSendMessage = async () => {
    socket.emit("sendMessage", {
      sender: userInfo.id,
      content: message,
      recipient: selectedChatData._id,
      messageType: "text",
      fileUrl: undefined,
    });

    setMessage("");
    await updateDmContactsList();
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAttachmentChange = async (e) => {
    try {
      setIsSendingFile(selectedChatData?._id, true);
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        setIsSendingFile(selectedChatData?._id, true);
        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData);

        if (response.status === 200 && response.data) {
          setIsSendingFile(selectedChatData?._id, false);
          socket.emit("sendMessage", {
            sender: userInfo.id,
            content: undefined,
            recipient: selectedChatData._id,
            messageType: "file",
            fileUrl: response.data.filePath,
          });
        }
      }
    } catch (err) {
      setIsSendingFile(selectedChatData?._id, false);
      console.log("error in handleAttachmentChange");
    }
  };
  return (
    <div className=" bg-base-200 flex justify-center items-center px-3 py-2 custom-chat-1:px-4 custom-chat-1:py-3 gap-2 custom-chat-1:gap-6 custom-chat-3:gap-2 custom-chat-3:px-3 custom-chat-3:py-2">
      <div className="flex-1 flex bg-base-100 rounded-md items-center gap-2 custom-chat-2:gap-5 pr-3 custom-chat-1:pr-5 text-base-content">
        <input
          type="text"
          className="w-32 custom-chat-3:w-32 flex-1 p-4 custom-chat-1:p-5 bg-transparent rounded-md focus:border-none focus:outline-none placeholder:text-base-content/60 custom-chat-2:w-fit"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="tooltip flex" data-tip="Send file">
          <button
            className="text-base-content duration-300 transition-all -rotate-45 hover:text-base-content/70 hover:scale-105"
            onClick={handleAttachmentClick}
          >
            <Paperclip />
          </button>
        </div>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAttachmentChange}
        />
        <div className="relative hidden custom-chat-2:inline-block">
          <div className="tooltip flex" data-tip="Emojis">
            <button
              className="text-base-content duration-300 transition-all hover:text-base-content/70 hover:scale-105"
              onClick={() => setEmojiPickerOpen(true)}
            >
              <SmilePlus />
            </button>
          </div>
          <div className="absolute bottom-16 right-0 z-10" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      
      <div className="tooltip flex" data-tip="Send">
        <button
          className={`rounded-md flex items-center justify-center p-4 custom-chat-1:p-5 ${
            message.trim()
              ? "bg-primary text-primary-content focus:bg-primary/70 hover:bg-primary/70"
              : "bg-primary/40 text-neutral/60 cursor-not-allowed"
          } duration-300 transition-all `}
          onClick={handleSendMessage}
          disabled={!message.trim()}
        >
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
};

export default MessageBar;
