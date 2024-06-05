const commentReducer=(state={data:null}, action)=>{
    //console.log(action);
     switch (action.type) {
        case 'POST_COMMENT':
            //console.log(action?.data);
            return {...state};
        case 'EDIT_COMMENT':
                //console.log(action?.data);
            return {...state};    
        case 'FETCH_ALL_COMMENTS':
            return {...state,data:action.payload};    
        default:
            return state;    
     }
}

export default commentReducer;