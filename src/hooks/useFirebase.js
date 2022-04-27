import initializeFirebaseApplication from '../components/LoginRelated/Firebase/firebase.init'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


initializeFirebaseApplication();
const useFirebase = () => {

    const [user, setUser] = useState({})
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [manager, setManager] = useState(false)
    // const location = useLocation();
    // const redirect_url = location?.state?.from || '/'
    // const navigate = useNavigate()



    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // google sign in
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)

    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    // email pass signup
    const emailPassSignUp = (name, email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }



    //////////////////////////////////////////////////////////////////////////////////////////////
    // email PassSignIn
    const emailPassSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)

    }










    // get current user when reload
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser({})
            }
            setIsLoading(false)
        });
    }, [auth])


    // check user is Manager or not 
    useEffect(() => {
        const url = `http://localhost:5000/user/${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => setManager(data.isManager))
    }, [user.email])












    // log out
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
    }





    return {
        googleSignIn,
        user,
        setUser,
        logOut,
        emailPassSignUp,
        emailPassSignIn,
        isLoading,
        setError,
        error,
        manager


    }

}


export default useFirebase;