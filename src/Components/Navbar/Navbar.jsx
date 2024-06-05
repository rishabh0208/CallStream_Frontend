import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from './logo.png'
import SearchBar from './SearchBar/SearchBar'
import {RiVideoAddLine} from "react-icons/ri";
import {BiUserCircle} from "react-icons/bi";
import {IoMdNotificationsOutline} from "react-icons/io";
import {Link} from "react-router-dom";
import {GoogleLogin} from "react-google-login"
import {gapi} from "gapi-script"
import {useDispatch, useSelector} from "react-redux"
import {login} from "../../actions/auth"
import Auth from '../../Pages/Auth/Auth';


function Navbar({toggleDrawer,setEditCreateChannelBtn}) {

    const [AuthBtn, setAuthBtn]=useState(false)

    // const CurrentUser={
    //     result: {
    //         email: "rishabh180802@gmail.com",
    //         joinedOn:"2222-07-15T09:23.489Z",
    //     },
    // };
   
   const CurrentUser=useSelector((state)=>state.currentUserReducer)
   // console.log(CurrentUser)
    useEffect(() => {
        function start(){
           gapi.client.init({
            clientId: "1023592762254-09jd2jr6qcup5ee3va6alsevu8rj1su9.apps.googleusercontent.com",
            scope: "email",
           }) 
        }
        gapi.load("client:auth2",start);
    },[]);

    const dispatch=useDispatch();

    const onSuccess=(response)=>{
        const Email= response?.profileObj.email;
        //console.log(Email);
        //console.log(response.accessToken);
      dispatch(login({email:Email}))
    }

    const onFailure=(response)=>{
         console.log("Failed",response)
    }  
  return ( 
    <>
  
    <div className='Container-navbar'>
      <div className="Burger-Logo-navbar">
        <div className="burger" onClick={()=>toggleDrawer()}>
            <p></p>
            <p></p>
            <p></p>
        </div>
        <Link to={'/'} className="logo-div-navbar">
            <img src={logo} alt="" />
            <p className="logo-title-navbar">Youtube</p>
        </Link>
      </div>
       <SearchBar />
       <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
       <div className="apps_box">
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
        <p className="appBox"></p>
       </div>
       <IoMdNotificationsOutline size={22} className="vid_bell_Navbar"/>
       <div className="Auth-cont-Navbar">
       {
            CurrentUser ? (
            <>
            <div className="Chanel_logo_app" onClick={()=>setAuthBtn(true)} >
                <p className="fstChar_logo_app">
                    {
                        CurrentUser?.result.name ?(
                            <>
                            {CurrentUser?.result.name.charAt(0).toUpperCase()}
                            </>
                        ):(<>
                            {CurrentUser?.result.email.charAt(0).toUpperCase()}
                        </>)
                    }
                </p>
            </div>
            </>
            ):(
            <>
            <GoogleLogin 
            clientId={"1023592762254-09jd2jr6qcup5ee3va6alsevu8rj1su9.apps.googleusercontent.com"}
            onSuccess={onSuccess}
            onFailure={onFailure}
            render={ (renderProps)=>
                (<p onClick={renderProps.onClick} className="Auth-btn">
                <BiUserCircle  size={22} />
                <b>Sign in</b>
            </p>)
            } 
            />
       
        </>
        )}
       </div>
    </div>
    {
        AuthBtn &&
        <Auth
        setEditCreateChannelBtn={ setEditCreateChannelBtn}
        setAuthBtn={setAuthBtn}
        User={CurrentUser}
        />
    }
    </>
  );
}

export default Navbar
