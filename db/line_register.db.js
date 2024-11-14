import { collection, doc } from "firebase/firestore";
import db from "./connection";

async function createUser(data){
    try{
        const memberRef = doc(collection(db, "line-noti-register"), "Member") ;
        const response = await memberRef.set({
            line_id: data.line_id,
            shipped_address: "",
            shipped_name: ""
        })
        return response;
    }catch(e){
        console.log("createUser Error: ", e);
    }
}

export {
    createUser
}