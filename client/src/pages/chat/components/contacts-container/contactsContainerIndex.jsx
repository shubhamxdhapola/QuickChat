import ProfileInfo from "./components/profile-info"
import ContactList from "./components/contact-list/contact-list"
import ContactsHeader from "./components/contacts-header/ContactsHeader"
import { apiClient } from "@/lib/api-client"
import { useEffect } from "react"
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants"
import { useAppStore } from "@/store"

const ContactsContainer = () => {

  const {
    directMessagesContacts,
    setDirectMessagesContacts,
    setIsContactsLoading
  } = useAppStore()

  useEffect(() => {
    setIsContactsLoading(true)
    const getContacts = async () => {
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES)
      if (response.data.contacts) {
        setDirectMessagesContacts(response.data.contacts)
        setIsContactsLoading(false)
      }
    }
    getContacts()
  }, [])

  return (
    <div className="content-center flex-1 md:flex-none w-full md:w-[30%] custom-home-1:w-[40%] custom-home-2:w-[45%]">
      <div className="relative bg-base-300 h-[97%] sm:h-[95%] md:h-[93%] flex flex-col gap-2 sm:gap-2.5 md:gap-3">
        <ContactsHeader />
        <div 
          className="min-h-[80%] max-h-[80%] md:min-h-[75%] md:max-h-[75%] transition-all duration-300 bg-base-200 overflow-y-auto rounded-lg shadow-md" 
          style={{ scrollbarWidth: 'none' }} 
          data-aos="fade-right"
        >
          <ContactList contacts={directMessagesContacts} />
        </div>
        <ProfileInfo />
      </div>
    </div>
  )
}

export default ContactsContainer
