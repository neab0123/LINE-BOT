import { db } from "./connection";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function createUser(data){
    try{
        addDoc(collection(db, "line-noti-register"), {
            line_id: data.line_id,
            timestamp: serverTimestamp()
        })
    }catch(e){
        console.log("createUser Error: ", e);
    }
}

export {
    createUser
}