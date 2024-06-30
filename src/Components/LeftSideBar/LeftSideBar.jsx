import React from 'react'
import {AiOutlineHome} from "react-icons/ai"
import {MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary, MdVideoCall} from "react-icons/md"
import './LeftSideBar.css'
import {NavLink} from 'react-router-dom';
import shorts from './shorts-logo.png'

const LeftSideBar = () => {
  return (
    <div className='container-leftsidebar'>

       <NavLink to={'/'} className='icon-sidebar-div'>
        <AiOutlineHome size={22} className="icon-sidebar" />
        <div className="text-sidebar-icon">Home</div>
       </NavLink>
       <div className='icon-sidebar-div'>
        <MdOutlineExplore size={22} className="icon-sidebar"  />
        <div className="text-sidebar-icon">Explore </div>
       </div>
       <div className='icon-sidebar-div'>
        <img src={shorts} width={22} className="icon-sidebar"  />
        <div className="text-sidebar-icon">Shorts</div>
       </div>
       <div className='icon-sidebar-div'>
        <MdOutlineSubscriptions size={22} className="icon-sidebar" />
        <div className="text-sidebar-icon" style={{fontSize:"12px"}}  >Subscriptions</div>
       </div>
       <NavLink to={'/library'} className='icon-sidebar-div'>
        <MdOutlineVideoLibrary size={22} className="icon-sidebar" />
        <div className="text-sidebar-icon">Library</div>
       </NavLink>
       <NavLink to={'/videocall'} className='icon-sidebar-div'>
        <MdVideoCall size={22} className="icon-sidebar" />
        <div className="text-sidebar-icon">Videocall</div>
       </NavLink>
    </div>
  )
}

export default LeftSideBar
