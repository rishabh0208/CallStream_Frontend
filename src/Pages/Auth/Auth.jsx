import React from "react";
import "./Auth.css";
import { GoogleLogout } from "react-google-login";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";
import { Link } from "react-router-dom";

function Auth({ User,setAuthBtn, setEditCreateChannelBtn }) {
  const dispatch = useDispatch();
  const onLogoutSuccess = () => {
    dispatch(setCurrentUser(null));
    alert("Log Out Successfully");
  };
  return (
    <div className="Auth-container" onClick={()=>setAuthBtn(false)}>
      <div className="Auth-container2">
        <p className="User-details">
          <div className="Chanel-logo-app">
            <p className="fstChar-logo-app">
              {User?.result.name ? (
                <>{User?.result.name.charAt(0).toUpperCase()}</>
              ) : (
                <>{User?.result.email.charAt(0).toUpperCase()}</>
              )}
            </p>
          </div>
          <div className="email-auth">{User?.result.email}</div>
        </p>
        <div className="btns-auth">
            {
              User?.result.name? <>
              {
                <Link to={`/channel/${User?.result._id}`} className="btn-auth" >
                Your Channel
                   </Link>
              }
              
        </>  : <>
        <input
            type="submit"
            className="btn-auth"
            value="Create Your Channel"
            onClick={()=> setEditCreateChannelBtn(true)}
          />
       
              </>
            }
          
        <div>

        
        <GoogleLogout
          clientId={
            "1023592762254-09jd2jr6qcup5ee3va6alsevu8rj1su9.apps.googleusercontent.com"
          }
          onLogoutSuccess={onLogoutSuccess}
          render={(renderProps) => (
            <div onClick={renderProps.onClick} className="btn-auth">
              <BiLogOut />
              Log Out
            </div>
          )}
        />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
