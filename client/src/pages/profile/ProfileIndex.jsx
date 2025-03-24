import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { colors, getColor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Camera, Trash2, LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { apiClient } from "@/lib/api-client";
import { HOST } from "@/utils/constants.js";
import {
  ADD_PROFILE_IMAGE_ROUTE,
  REMOVE_PROFILE_IMAGE_ROUTE,
  UPDATE_PROFILE_ROUTE,
} from "@/utils/constants";

const Profile = () => {

  const navigate = useNavigate();
  const { userInfo, setUserInfo, setIsProcessingImage, isProcessingImage } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = 'QuickChat - Profile'
    if (userInfo.profileSetUp) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }

    if (userInfo.image) {
      setImage(`${userInfo.image}`);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE, {
          firstName,
          lastName,
          color: selectedColor,
        });
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile updated successully");
          navigate("/chat");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetUp) {
      navigate("/chat");
    } else {
      toast.error("Please setup profile to continue");
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsProcessingImage(true)
      const formData = new FormData();
      formData.append("profile-image", file);
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData);
      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
        toast.success("Image updated successfully.");
        setIsProcessingImage(false)
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      setIsProcessingImage(true)
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE);
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Image removed successfully");
        setIsProcessingImage(false)
        setImage(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-base-200 h-[100vh] flex items-center justify-center flex-col gap-10 overflow-x-hidden">
      <div className="flex flex-col gap-6 w-[90vw] md:w-max">
        <div className="px-2 custom:px-20">
          <div
            className="tooltip cursor-pointer bg-base-100 rounded-full flex items-center justify-center p-1 h-8 w-8 hover:bg-base-300 duration-300 transition-all hover:text-base-content/70"
            data-tip="Go Back"
            onClick={handleNavigate}
            data-aos="fade-down"
          >
            <button className="text-base-content ">
              <ChevronLeft />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] sm:gap-1 items-center">
          <div
            className="h-full w-32 sm:w-48 sm:h-48 relative flex items-center justify-center mx-auto"
            data-aos="fade-right"
          >
            {image ? (
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2 h-full w-full">
                  <img src={image} />
                </div>
              </div>
            ) : (
              <div
                className={`uppercase h-32 w-32 sm:w-48 sm:h-48 text-5xl border-2 flex items-center justify-center rounded-full ${getColor(
                  selectedColor
                )}`}
              >
                {firstName
                  ? `${firstName.split("").shift()}`
                  : userInfo.email.split("").shift()}
              </div>
            )}

            <div
              className="tooltip p-1 sm:p-1.5 bg-primary tool-tip text-primary-content flex items-center justify-center rounded-full absolute -top-1 right-3 sm:top-0 sm:right-5 cursor-pointer hover:bg-base-100 border-2 border-primary hover:text-base-content duration-300"
              onClick={image ? handleDeleteImage : handleFileInputClick}
              data-tip={image ? "Remove Image" : "Add Image"}
            >
              <button>
              {(isProcessingImage) ? (
                <LoaderCircle className="h-4 w-4 sm:h-[18px] sm:w-[18px] animate-spin" />
                ) : (
                image ? (
                  <Trash2 className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                ) : (
                  <Camera className="h-4 w-4 sm:h-[18px] sm:w-[18px]"/>
                )
              )}

              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              name="profile-image"
              accept=".png, .jpg, .jpeg, .svg, .webps, .hevic"
            />
          </div>
          <div
            className="flex min-w-32 md:min-w-64 flex-col gap-5 items-center justify-center px-2 custom:px-20"
            data-aos="fade-left"
          >
            <div className="alert w-full bg-base-300 text-md cursor-not-allowed rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{userInfo.email}</span>
            </div>
            <div className="w-full">
              <input
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full placeholder:text-base-content/60 text-sm"
              />
            </div>
            <div className="w-full">
              <input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full placeholder:text-base-content/60 text-sm"
              />
            </div>
            <div className="w-full flex gap-5 justify-center">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColor === index
                      ? "outline outline-white/100 outline-1"
                      : ""
                  }`}
                  key={index}
                  onClick={() => setSelectedColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full px-2 custom:px-20" data-aos="fade-up">
          <Button
            className="h-12 w-full btn btn-primary transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
