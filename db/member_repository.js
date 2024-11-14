import { db } from "./connection";
import { collection, addDoc, serverTimestamp, query } from "firebase/firestore";

async function createUser(data){
    try{
        return await addDoc(collection(db, "line-noti-register"), {
            line_id: data.line_id,
            timestamp: serverTimestamp()
        }).then((res) => res)
    }catch(e){
        console.log("createUser Error: ", e);
    }
}

async function updateUser(id, newData){
    try{

    }catch(e){
        console.log("updateUser Error: ", e);
    }
}

export {
    createUser
}