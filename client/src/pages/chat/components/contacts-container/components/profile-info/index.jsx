import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/lib/utils";
import { Power } from "lucide-react";
import { toast } from "react-hot-toast";
import { LOGOUT_ROUTE } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const logout = async () => {
    const response = await apiClient.post(LOGOUT_ROUTE);
    if (response.status === 200) {
      toast.success("Logout successfully");
      setUserInfo(null);
    }
  };

  return (
    <div
      className="h-[13%] rounded-lg flex items-center justify-between px-4 py-2 w-full bg-base-200 text-base-content shadow-md "
      data-aos="fade-up"
    >
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12 rounded-full overflow-hidden">
            {userInfo.image ? (
              <AvatarImage
                src={userInfo.image}
                alt="profile"
                className="object-cover w-full h-full bg-black rounded-full"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          <div className="text-md font-semibold">
            {userInfo.firstName && userInfo.lastName
              ? `${userInfo.firstName} ${userInfo.lastName}`
              : ""}
          </div>
          <div className="text-xs custom-nav:text-sm text-base-content/70">
            <span>User since </span>
            <span>{userInfo.createdAt?.split("T")[0]}</span>
          </div>
        </div>
      </div>

      <div className="cursor-pointer">
        <div className="tooltip flex" data-tip="Logout">
          <button
            className="text-base-content duration-300 transition-all hover:text-base-content/70 hover:scale-105"
            onClick={logout}
          >
            <Power size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
