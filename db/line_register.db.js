import { collection, setDoc, getDoc } from "firebase/firestore";
import db from "./connection";

async function createUser(data){
    try{
        const memberRef = await getDoc(collection(db, "line-noti-register")) ;
        console.log(memberRef)
        return response;
    }catch(e){
        console.log("createUser Error: ", e);
    }
}

export {
    createUser
}