import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CreateEditChannel.css";
import { login } from "../../actions/auth";
import { updateChannelData } from "../../actions/channelUser";

function CreateEditChannel({ setEditCreateChannelBtn }) {
  // const CurrentUser = {
  //   result: {
  //    email: "rishabh180802@gmail.com",
  //    joinedOn: "2222-07-15T09:23.489Z",
  //  },
  // };

  const CurrentUser = useSelector((state) => state.currentUserReducer);

  const [name, setName] = useState(CurrentUser?.result.name);
  const [desc, setdesc] = useState(CurrentUser?.result.desc);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!name) {
      alert("Plz Enter Name !");
    } else if (!desc) {
      alert("Plz Enter Description");
    } else {
      dispatch(
        updateChannelData(CurrentUser?.result._id, { name: name, desc: desc })
      );
      setEditCreateChannelBtn(false);
      setTimeout(() => {
        dispatch(login({ email: CurrentUser?.result.email }));
      }, 5000);
    }
  };
  return (
    <div className="container-createeditchannel">
      <input
        onClick={() => setEditCreateChannelBtn(false)}
        type="submit"
        name="text"
        value={"X"}
        className="ibtn-x"
      />
      <div className="container2-createeditchannel">
        <h1>
          {CurrentUser?.result.name ? <>Edit </> : <>Create </>}
          Your Channel
        </h1>
        <input
          type="text"
          placeholder="Enter Your/Channel Name"
          className="ibox"
          name="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          type="text"
          rows={15}
          placeholder={"Enter Channel Description"}
          className={"ibox"}
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
        <input
          type="submit"
          value={"submit"}
          onClick={handleSubmit}
          className="ibtn"
        />
      </div>
    </div>
  );
}

export default CreateEditChannel;
