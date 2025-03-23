import { useAppStore } from '@/store'
import { Link } from 'react-router-dom'
import { Palette, User } from "lucide-react"
import NewDm from '../new-dm'

const SidebarHeader = () => {

    const { userInfo } = useAppStore()
    return (
        <div className="flex items-center gap-2 h-[8%] md:h-[10%] justify-center w-full text-base-content font-semibold text-sm md:text-md" ata-aos="fade-down">
            <Link
                to={"/theme"}
                className={`flex gap-2 justify-center items-center h-full hover:bg-base-100 transition-all duration-300 rounded-lg flex-1 flex-nowrap bg-base-200 p-2 md:p-0 shadow-md`}
            >
                <Palette className="size-5" />
                <span className="hidden custom-nav:inline">Themes</span>
            </Link>
        {userInfo && (<>
            <Link to={"/profile"} className={`flex gap-2 justify-center items-center h-full hover:bg-base-100 transition-all duration-300 rounded-lg flex-1 flex-nowrap bg-base-200 p-2 md:p-0 shadow-md`}>
                <User className="size-5" />
                <span className="hidden custom-nav:inline">Profile</span>
            </Link>
            <NewDm />
        </>)}
        </div>
    )
}

export default SidebarHeader
