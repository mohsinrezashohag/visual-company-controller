import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
const initializeFirebaseApplication = () => {

    return initializeApp(firebaseConfig)


}

export default initializeFirebaseApplication;