import { Outlet } from "react-router-dom"

export default function Layout(){
    return (
        <div className="flex flex-col w-full h-screen items-center">
            <Outlet/>
        </div>
    ) 
}