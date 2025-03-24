import { useEffect, useRef, useState } from "react"
import { useAppStore } from "@/store"
import { apiClient } from "@/lib/api-client"
import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constants"
import { File, ArrowDownToLine, ImageDown, X, LoaderCircle } from "lucide-react"
import MessageSkeleton from "@/components/skeletons/MessageSkeleton"
import moment from "moment"

const MessageContainer = () => {
  
  const [showImage, setShowImage] = useState(false)
  const [imageURL, setImageURL] = useState(null)
  const [downloadingFiles, setDownloadingFiles] = useState({})

  const scrollRef = useRef()
  const {
    isChatSelected,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
    setIsMessagesLoading,
    isMessagesLoading,
  } = useAppStore()

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true)
      try {
        const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE, {
          id: selectedChatData._id,
        })
        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages)
          setIsMessagesLoading(false)
        }
      } catch (err) {
        setIsMessagesLoading(false)
        console.log("Error in getMessages", err)
      }
    }
    if (selectedChatData._id) {
      if (isChatSelected) getMessages()
    }
  }, [selectedChatData, isChatSelected, setSelectedChatMessages])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedChatMessages])

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jepg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i
    return imageRegex.test(filePath)
  }

  const downloadFile = async (fileUrl) => {
    try {
      setDownloadingFiles((prev) => ({ ...prev, [fileUrl]: true }))
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      link.download = fileUrl.split("/").pop() 
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
      setDownloadingFiles((prev) => ({ ...prev, [fileUrl]: false }))
    } catch (error) {
      console.error("Download failed:", error)
      setDownloadingFiles((prev) => ({ ...prev, [fileUrl]: false }))
    }
  }

  const renderDmMessages = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-primary text-primary-content"
              : "bg-base-300 text-base-content"
          }  inline-block p-3 custom-chat-1:p-4 custom-chat-3:p-3 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-primary text-primary-content"
              : "bg-base-300 text-base-content"
          } inline-block p-1 custom-chat-1:p-2 custom-chat-3:p-1 rounded my-1 max-w-[70%] break-words `}
        >
          {checkIfImage(message.fileUrl) ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowImage(true)
                setImageURL(message.fileUrl)
              }}
            >
              <img
                src={message.fileUrl}
                className="h-[auto] w-[200px] custom-chat-1:w-[270px] custom-chat-3:w-[200px]"
                alt="img"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="p-3">
                <File size={20} />
              </span>
              <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                {message.fileUrl.split("/").pop()}
              </span>
              <span
                className="p-3 rounded-lg custom-chat-1:hover:bg-base-100/20 cursor-pointer transition-all duration-300"
                onClick={() => downloadFile(message.fileUrl)}
              >{downloadingFiles[message.fileUrl] 
                  ? <LoaderCircle size={20} className="animate-spin" /> 
                  : <ArrowDownToLine size={20} />
                }
                
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-base-content/70 mb-3">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  )

  const renderMessages = () => {
    let lastDate = null
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD")
      const showDate = messageDate !== lastDate
      lastDate = messageDate
      return (
        <div key={index}>
          {showDate && (
            <div className="text-sm custom-chat-1:text-md text-center text-base-content my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {isChatSelected && renderDmMessages(message)}
        </div>
      )
    })
  }

  return (
    <>
      {isMessagesLoading ? (
        <MessageSkeleton />
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-hidden py-2 px-3 custom-chat-1:px-4 w-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-opacity-50" >
          {renderMessages()}
          <div ref={scrollRef} />
          {showImage && (
            <div
              className="fixed z-[1000] top-0 left-0 h-[100%] w-[100%] flex items-center justify-center backdrop-blur-lg flex-col"
              data-aos="zoom-in"
            >
              <div>
                <img
                  src={imageURL}
                  alt="img"
                  className="h-[80vh] w-full object-contain sm:rounded"
                />
              </div>
              <div className="flex gap-5 fixed top-0 mt-4">
                <button
                  className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                  onClick={() => downloadFile(imageURL)}
                >
                {downloadingFiles[imageURL] 
                  ? <LoaderCircle className="animate-spin" /> 
                  : <ImageDown />
                }
                  
                </button>
                <button
                  className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                  onClick={() => {
                    setShowImage(false)
                    setImageURL(null)
                  }}
                >
                  <X />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default MessageContainer
