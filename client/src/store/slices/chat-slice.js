import { apiClient } from "@/lib/api-client"
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants"

export const createChatSlice = (set, get) => ({

    isImageUploading : false,
    setIsProcessingImage: (isProcessingImage) => set({isProcessingImage}),
    isChatSelected : false,
    selectedChatData : undefined,
    selectedChatMessages : [],
    directMessagesContacts : [],
    isSendingFile: {},
    isMessagesLoading : true,
    isContactsLoading : true,
    isNewMessage : false,
    activeUsers : [],
    setActiveUsers : (activeUsers) => set({activeUsers}),
    setIsNewMessage : (isNewMessage) => set({isNewMessage}),
    setIsMessagesLoading : (isMessagesLoading) => set({isMessagesLoading}),
    setIsContactsLoading : (isContactsLoading) => set({isContactsLoading}),
    setIsSendingFile: (chatId, status) =>
        set((state) => ({
            isSendingFile: { ...state.isSendingFile, [chatId]: status }
        }
    )),
    setIsDownloading : (isDownloading) => set({isDownloading}),
    setDirectMessagesContacts : (directMessagesContacts) => set({directMessagesContacts}),
    setIsChatSelected : (isChatSelected) => set({isChatSelected}),
    setSelectedChatData : (selectedChatData) => set({selectedChatData}),
    setSelectedChatMessages : (selectedChatMessages) => set({selectedChatMessages}),
    closeChat : () => {
        set({
            selectedChatData : undefined, 
            isChatSelected : false,
            selectedChatMessages : []
        })
    },
    addMessage : (message) => {
        const selectedChatMessages = get().selectedChatMessages
        set({
            selectedChatMessages : [
                ...selectedChatMessages,{
                    ...message,
                    recipient : message.recipient._id,
                    sender : message.sender._id,
                }
            ]
        })
    },
    updateDmContactsList : async () => {
        const setDirectMessagesContacts = get().setDirectMessagesContacts
        const response = await apiClient.get(GET_DM_CONTACTS_ROUTES)
        if(response.data.contacts) {
            setDirectMessagesContacts(response.data.contacts)    
        }
    },

    newBadge: new Set(JSON.parse(localStorage.getItem("newBadge") || "[]")),
    setNewBadge: (senderId) => {
        const updatedBadge = new Set(get().newBadge)
        updatedBadge.add(senderId)
        set({ newBadge: updatedBadge })
        localStorage.setItem("newBadge", JSON.stringify([...updatedBadge]))
    },
    removeNewBadge: (senderId) => {
        const updatedBadge = new Set(get().newBadge)
        updatedBadge.delete(senderId)
        set({ newBadge: updatedBadge })
        localStorage.setItem("newBadge", JSON.stringify([...updatedBadge]))
    },
})