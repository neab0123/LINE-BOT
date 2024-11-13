import DB from './connection';
import { collection, getDocs } from 'firebase/firestore/lite';

async function getEmailAndToken(email){
    const line_noti_register = collection(DB, 'line-noti-register');
    
}

async function register(email){

}