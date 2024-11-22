import { db } from "./connection";
import { collection, addDoc, serverTimestamp, updateDoc, doc, query, where, getDocs } from "firebase/firestore";

async function createUser(data){
    try{
        return await addDoc(collection(db, "line-noti-register"), {
            line_id: data.line_id,
            state: data.state,
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
        const snapshot =  await getDocs(q)
        let users = [];
        snapshot.forEach((doc) => {
            users.push(doc.data())
        });
        return users;
    }catch(e){
        
    }
}

export {
    createUser,
    getUser
}