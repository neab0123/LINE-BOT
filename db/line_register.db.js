import { collection, setDoc, getDocs } from "firebase/firestore";
import db from "./connection";

async function createUser(data){
    try{
        const memberCol = collection(db, "line-noti-register");
        const memberSnapshot = await getDocs(memberCol);
        const memberList = memberSnapshot.docs.map(doc => doc.data())
        console.log(memberList);
        return response;
    }catch(e){
        console.log("createUser Error: ", e);
    }
}

export {
    createUser
}