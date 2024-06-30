import * as api from "../api";

export const addpoints=(id)=>async(dispatch)=>{
    try{
        const {data}=await api.addpoints(id);
        console.log(data);
        dispatch({ type: 'ADD_POINTS', payload:data.points });
        //dispatch(getAllComment())
       } catch(error){
           console.log(error);
       }
}


// export const fetchUser = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.fetchUser(id);
//     dispatch({ type: 'FETCH_USER', payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };



