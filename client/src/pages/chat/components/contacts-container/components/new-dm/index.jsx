import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useAppStore } from "@/store";
import Lottie from "react-lottie";
import { animationDefaultOptions } from "@/lib/utils";
import { X, UserPlus } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const NewDm = () => {
  const { setIsChatSelected, setSelectedChatData } = useAppStore();
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchContacts = async (value) => {
    setSearchTerm(value);
    try {
      if (value.length > 0) {
        const response = await apiClient.post(SEARCH_CONTACTS_ROUTES, {
          searchTerm: value,
        });
        if (response.status === 200 && response.data.contacts) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (err) {
      console.log("Error in searchContacts");
    }
  };

  const closeContactSearchDialog = () => {
    setSearchedContacts([]);
    setSearchTerm("");
    setOpenNewContactModal(false);
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModal(false);
    setIsChatSelected(true);
    setSelectedChatData(contact);
    setSearchedContacts([]);
    setSearchTerm("");
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="h-full flex-1 inline-block">
            <button
              className="flex gap-2 items-center justify-center rounded-lg h-full hover:bg-base-100 transition-all duration-300 flex-nowrap w-full bg-base-200 p-2 md:p-0 shadow-md"
              onClick={() => setOpenNewContactModal(true)}
            >
              <UserPlus className="size-5" />
              <span className="hidden custom-nav:inline">New DM</span>
            </button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-base-200 border-none text-base-content w-[400px] h-[400px] flex flex-col px-0 overflow-y-auto rounded-sm pt-0 gap-0">
          <div className="sticky top-0 z-10 bg-base-200 space-y-4 py-5">
            <DialogHeader>
              <DialogTitle className="px-6">
                Please select a contact
              </DialogTitle>
              <X
                className="cursor-pointer size-5 absolute top-2 right-2"
                style={{ marginTop: "0px" }}
                onClick={closeContactSearchDialog}
              />
            </DialogHeader>
            <div className="px-6">
              <input
                placeholder="Search by name or email"
                className="p-6 input input-bordered w-full bg-base-300 placeholder:text-base-content/70 text-sm"
                onChange={(e) => searchContacts(e.target.value)}
              />
            </div>
          </div>

          {searchTerm.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center duration-1000 transition-all content-center">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
            </div>
          ) : searchedContacts.length > 0 ? (
            <ScrollArea className="height-[250px]">
              <div className="flex flex-col">
                {searchedContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer hover:bg-base-100 px-6 py-2 transition-all duration-300"
                    onClick={() => selectNewContact(contact)}
                  >
                    <div className="w-12 h-12 relative">
                      <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                        {contact.image ? (
                          <AvatarImage
                            src={contact.image}
                            alt="profile"
                            className="object-cover w-full h-full bg-black rounded-full"
                          />
                        ) : (
                          <div
                            className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                              contact.color
                            )}`}
                          >
                            {contact.firstName
                              ? contact.firstName.charAt(0)
                              : contact.email.charAt(0)}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col text-base-content">
                      <span>
                        {" "}
                        {contact.firstName && contact.lastName
                          ? `${contact.firstName} ${contact.lastName}`
                          : contact.email}
                      </span>
                      <span className="text-xs">{contact.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center duration-1000 transition-all content-center">
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-3 md:mt-0 text-lg transition-all duration-100">
                No contacts found
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDm;
