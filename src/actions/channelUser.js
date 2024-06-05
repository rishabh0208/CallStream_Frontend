import * as api from "../api";

export const fetchAllChannel=()=>async(dispatch)=>{
   try {
      //console.log("data");
       const {data}= await api.fetchAllChannel();
       
       dispatch({type:'FETCH_CHANELS',payload:data})
   } catch (error) {
       console.log(error)
   }
}
export const updateChannelData=(id,updateData)=> async(dispatch)=>{
try{
   
   const {data}=await api.updateChannelData(id,updateData);
   dispatch({type:'UPDATE_DATA', payload:data})
} catch (error){
     console.log(error);
}
}