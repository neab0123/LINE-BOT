import firebase from "firebase/app";
import "firebase/firestore";

async function createUser(data){
    try{
        firebase.firestore().collection("line-noti-register").add(data)
    }catch(e){
        console.log("createUser Error: ", e);
    }
}

export {
    createUser
}