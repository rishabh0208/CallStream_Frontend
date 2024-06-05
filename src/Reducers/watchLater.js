const watchLaterReducer=(state={data:null}, action)=>{
    //console.log(action);
     switch (action.type) {
        case 'POST_WATCHLATER':
            //console.log(action?.data);
            return {...state, data:action?.data};
        case 'FETCH_ALL_WATCHLATER_VIDEOS':
            return {...state,data:action.payload};    
        default:
            return state;    
     }
}

export default watchLaterReducer;