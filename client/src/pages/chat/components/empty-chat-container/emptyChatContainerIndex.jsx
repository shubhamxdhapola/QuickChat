import { MessageSquare } from "lucide-react"

const EmptyChatContainer = () => {

  return (
    <div className="flex-1 bg-base-300 hidden md:flex justify-center items-center duration-1000 transition-all w-[70%] custom-home-1:w-[60%] custom-home-2:w-[45%]">
      <div className="bg-base-200 h-[93%] w-full content-center rounded-lg shadow-md" data-aos="fade-left">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        <div
          className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 transition-all duration-100 text-center p-5"
        >
          <h3 className="font-medium text-base-content md:text-3xl lg:text-4xl">
            Hi! Welcome to&nbsp;
            <span className="text-primary font-semibold">
              QuickChat!
            </span> 
          </h3>
          <p className="text-base-content/60 text-md">
            Connect with friends, share moments, and stay in touch with you loved ones.
          </p>
        </div>
      </div>
      </div>
  )
}

export default EmptyChatContainer
