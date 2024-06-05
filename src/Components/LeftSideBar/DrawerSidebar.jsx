import React from 'react'
import './LeftSideBar.css'
import {AiFillLike, AiFillPlaySquare, AiOutlineHome} from "react-icons/ai"
import { MdOutlineExplore, MdOutlineVideoLibrary, MdOutlineWatchLater } from 'react-icons/md'
import { MdOutlineSubscriptions } from 'react-icons/md'
import shorts from './shorts-logo.png'
import { FaHistory } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';

const DrawerSidebar = ({toggleDrawer, toggleDrawerSidebar}) => {
  return (
    <div className='container-drawerleftsidebar' style={toggleDrawerSidebar} >
       <div className='container2-drawerleftsidebar'>
      <div className="drawer-leftsidebar">
        <NavLink to={'/'} className="icon-sidebar-div">
           <p>
            <AiOutlineHome size={22} className={"icon-sidebar"} style={{margin:"auto 0.7rem"}}/>
            <div className="text-sidebar-icon">Home</div>
            </p> 
            </NavLink>
            <div className="icon-sidebar-div">
                <p>
            <MdOutlineExplore size={22} className={"icon-sidebar"} style={{margin:"auto 0.7rem"}}/>
            <div className="text-sidebar-icon">Explore</div>
            </p> 
            </div>
            <div className="icon-sidebar-div">
                <p>
            <img src={shorts}
            width={22}
             className={"icon-sidebar"} style={{margin:"auto 0.7rem"}}/>
            <div className="text-sidebar-icon">Shorts</div>
            </p> 
            </div>
            <div className="icon-sidebar-div">
                <p>
            <MdOutlineSubscriptions size={22} className={"icon-sidebar"} style={{margin:"auto 0.7rem"}}/>
            <div className="text-sidebar-icon">Subscriptions</div>
            </p> 
            </div>
      </div>
      <div className="librarybtn-drawerleftsidebar">
      <NavLink to={'/library'} className="icon-sidebar-div">
                <p>
            <MdOutlineVideoLibrary size={22} className={"icon-sidebar"} style={{margin:"auto 0.7rem"}}/>
            <div className="text-sidebar-icon">Library</div>
            </p> 
            </NavLink>
            <NavLink to={'/history'} className="icon-sidebar-div">
                <p>
            <FaHistory size={22} className={"icon-sidebar"} style={{margin:"auto 0.7rem"}}/>
            <div className="text-sidebar-icon">History</div>
            </p> 
            </NavLink>
            <NavLink to={'/yourvideos'} className="icon-sidebar-div">
                <p>
            <AiFillPlaySquare size={22} className={"icon-sidebar"} style={{margin:"auto 0.7rem"}}/>
            <div className="text-sidebar-icon">Your Videos</div>
            </p> 
            </NavLink>
            <NavLink to={'/watchlater'} className="icon-sidebar-div">
                <p>
            <MdOutlineWatchLater size={22} className={"icon-sidebar"} style={{margin:"auto 0.7rem"}}/>
            <div className="text-sidebar-icon">Watch Later</div>
            </p> 
            </NavLink>
            <NavLink to={'/likedvideos'} className="icon-sidebar-div">
                <p>
            <AiFillLike size={22} className={"icon-sidebar"} style={{margin:"auto 0.7rem"}}/>
            <div className="text-sidebar-icon">Liked Videos</div>
            </p> 
            </NavLink>
      </div>
      <div className="subscriptions-lsdbar">
        <h3>Your Subscriptions</h3>
        <div className="channel-lsdbar">
          <p>C</p>
          <div>Channel 1</div>
        </div>
        <div className="channel-lsdbar">
          <p>C</p>
          <div>Channel 2</div>
        </div>
        <div className="channel-lsdbar">
          <p>C</p>
          <div>Channel 3</div>
        </div>
        <div className="channel-lsdbar">
          <p>C</p>
          <div>Channel 4</div>
        </div>
      </div>
            </div>
            <div className="container3-drawerleftsidebar" onClick={()=>toggleDrawer()}>

            </div>
    </div>
  );
}

export default DrawerSidebar
