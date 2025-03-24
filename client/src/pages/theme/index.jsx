import { THEMES } from "../../utils/themeConstants.js";
import { useAppStore } from "@/store";
import { SendHorizontal, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

const ThemePage = () => {

  useEffect(() => {
    document.title = 'QuickChat - Themes'      
  }, [])

  const { theme, setTheme } = useAppStore();
  const navigate = useNavigate();

  const handleOnClick = (t) => {
    setTheme(t);
    toast.success("Theme applied!");
  };
  const handleNavigate = () => {
    navigate("/chat");
  };

  return (
    <>
      <div
        className="tooltip flex items-center justify-center absolute left-[50%] -translate-x-[50%] top-10 cursor-pointer bg-base-200 rounded-full p-1 h-10 w-10 hover:bg-base-300 duration-300 transition-all hover:text-base-content/70"
        data-tip="Go Back"
        onClick={handleNavigate}
      >
        <button className="text-base-content">
          <X size={20} />
        </button>
      </div>

      <div className="h-auto container mx-auto px-4 p-20 max-w-5xl">
        <div className="space-y-6">
          <div data-aos="fade-right">
            <div className="flex flex-col gap-1 mb-4">
              <h2 className="text-md md:text-lg font-semibold">Themes</h2>
              <p className=" text-xs md:text-sm text-base-content/70">
                Choose a theme for your chat interface
              </p>
            </div>

            <div className="grid grid-cols-3 custom-theme-1:grid-cols-2 custom-theme-2:grid-cols-4 custom-theme-3:grid-cols-5 custom-theme-4:grid-cols-8 gap-2">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                    ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                  `}
                  onClick={() => handleOnClick(t)}
                >
                  <div
                    className="relative h-8 w-full rounded-md overflow-hidden"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 grid grid-cols-3 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div data-aos="fade-left">
            <h3 className="text-md md:text-lg font-semibold mb-3">Preview</h3>
            <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
              <div className="p-2 custom-theme-chat:p-4 bg-base-200">
                <div className="max-w-lg mx-auto">
      
                  <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
        
                    <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
              
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">John Doe</h3>
                          <p className="text-xs text-base-content/70">Active</p>
                        </div>
                      </div>
                    </div>

        
                    <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                      {PREVIEW_MESSAGES.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.isSent ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`
                              max-w-[80%] rounded-xl p-3 shadow-sm
                              ${
                                message.isSent
                                  ? "bg-primary text-primary-content"
                                  : "bg-base-200"
                              }
                            `}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`
                                text-[10px] mt-1.5
                                ${
                                  message.isSent
                                    ? "text-primary-content/70"
                                    : "text-base-content/70"
                                }
                              `}
                            >
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

        
                    <div className="p-2 custom-theme-chat:p-4 border-t border-base-300 bg-base-100">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="input input-bordered  text-sm h-10 flex-1 w-[70%]"
                          placeholder="Type a message..."
                          value="This is a preview"
                          readOnly
                        />
                        <button className="btn btn-primary h-10 min-h-0">
                          <SendHorizontal size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ThemePage;
