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

