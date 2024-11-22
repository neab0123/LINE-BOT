import { db } from "./connection";
import { collection, addDoc, serverTimestamp, updateDoc, getDoc, doc, query, where } from "firebase/firestore";

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

async function getUser(userId){
    try{
        const q = query(collection(db, "line-noti-register"), where("line_id", "==", userId))
        return await getDoc(q).forEach(doc => {
            console.log(doc.id, " => ", doc.data())
            return doc.data();
        });
    }catch(e){
        
    }
}

export {
    createUser,
    getUser
}