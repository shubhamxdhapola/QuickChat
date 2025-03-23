import { useState } from "react";
import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { Users } from "lucide-react";
import SidebarSkeleton from "@/components/skeletons/SideBarSkeleton";

const ContactList = ({ contacts }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatMessages,
    activeUsers,
    newBadge,
    removeNewBadge,
    isContactsLoading,
    setIsChatSelected,
  } = useAppStore();

  const [showActiveUsers, setShowActiveUsers] = useState(false);

  const filteredUsers = showActiveUsers
    ? contacts.filter((contact) => activeUsers.includes(contact._id))
    : contacts;

  const handleClick = (contact) => {
    setIsChatSelected(true);
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
    removeNewBadge(contact._id);
  };

  return (
    <div>
      <div className="border-b-2 border-base-300 bg-base-200 w-full py-3 px-4 sticky top-0 z-10 text-base-content">
        <div className="flex gap-2 items-center">
          <Users className="size-6" />
          <span className="font-medium">Contacts</span>
        </div>

        <div className="mt-3 items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showActiveUsers}
              onChange={(e) => setShowActiveUsers(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm text-base-content/80">
              Show active contacts
            </span>
          </label>
        </div>
      </div>
      {isContactsLoading ? (
        <SidebarSkeleton />
      ) : (
        <>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((contact) => (
              <div
                key={`${contact._id}-${showActiveUsers}`}
                className={`pl-6 py-3 mx-2 my-1 rounded-lg transition-all duration-300 cursor-pointer hover:bg-base-100 
                ${selectedChatData && selectedChatData._id === contact._id && "bg-base-300"
              }`}
                data-aos="fade-right"
                onClick={() => handleClick(contact)}
              >
                <div className="flex gap-3 items-center justify-start text-base-content relative">
                  <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                    {contact.image ? (
                      <>
                        <AvatarImage
                          src={contact.image}
                          alt="profile"
                          className="object-cover w-full h-full bg-black rounded-full"
                        />
                        {activeUsers.includes(contact._id) && (
                          <span className="absolute bottom-0 left-7 size-3 bg-green-500 rounded-full ring-1 ring-zinc-900" />
                        )}
                      </>
                    ) : (
                      <div
                        className={`uppercase h-10 w-10 text-lg flex items-center justify-center rounded-full ${
                          selectedChatData &&
                          selectedChatData._id === contact._id
                            ? "bg-[#ffffff22] border border-white/70"
                            : getColor(contact.color)
                        }`}
                      >
                        {contact.firstName
                          ? contact.firstName[0]
                          : contact.email[0]}
                        {activeUsers.includes(contact._id) && (
                          <span className="absolute bottom-0 left-7 size-3 bg-green-500 rounded-full ring-1 ring-zinc-900" />
                        )}
                      </div>
                    )}
                  </Avatar>

                  <div>
                    <span className="text-md lg:text-md">
                      {`${contact.firstName} ${contact.lastName}`}
                    </span>
                    <div className="text-xs text-base-content/70">
                      {activeUsers.includes(contact._id)
                        ? "Active"
                        : "Inactive"}
                    </div>
                  </div>
                  {newBadge.has(contact._id) && (
                    <div className="badge badge-sm badge-secondary bg-primary text-primary-content border-none animate-bounce">
                      New
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-zinc-500 py-4">
              {showActiveUsers ? "No active contacts" : "No chats"}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContactList;
