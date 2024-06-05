import {combineReducers} from "redux"
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import channelReducers from "./channel";
import VideoReducer from "./Video";
import likedVideoReducer from "./likedVideo";
import watchLaterReducer from "./watchLater";
import HistoryReducer from "./History";
import commentReducer from "./comments";
import PointsReducer from "./points";

export default combineReducers({
      authReducer,
      currentUserReducer, 
      channelReducers,
      VideoReducer,
      likedVideoReducer,
      watchLaterReducer,
      HistoryReducer,
      commentReducer,
      PointsReducer,
});