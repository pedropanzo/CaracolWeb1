import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import  Sidebar  from "./SideBar/sidebar"
import Topbar from "./TopBar/topBar"
import Footer from "./Footer"
import { initializeInspinia } from "../../assets/js/inspinia.js"

export default function AppLayout() {
  useEffect(() => {
    initializeInspinia()
  }, [])

  return (
    <div id="wrapper">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTEÚDO */}
      <div id="page-wrapper" className="gray-bg">

        <Topbar />          
        
        <Outlet />

        <Footer />
      </div>
    </div>
  )
}
