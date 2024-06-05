const PointsReducer =(state={data:null}, action) => {
    switch (action.type) {
        case 'ADD_POINTS':
            return {...state,data:action.payload};
        default:
            return state;         
    }
}
export default PointsReducer;
