import { db } from "./connection";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function createUser(data){
    try{
        return await addDoc(collection(db, "line-noti-register"), {
            line_id: data.line_id,
            timestamp: serverTimestamp()
        }).then((res) => res.data)
    }catch(e){
        console.log("createUser Error: ", e);
    }
}

export {
    createUser
}