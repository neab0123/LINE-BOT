import db from "./connection";
import { collection, addDoc } from "firebase/firestore";

async function createUser(data){
    try{
        const memberRef = db.collection("line-noti-register").doc("Member");
        const response = await memberRef.set({
            line_id: data.line_id,
            shipped_address: "",
            shipped_name: ""
        })
    }catch(e){

    }
}

export {
    createUser
}