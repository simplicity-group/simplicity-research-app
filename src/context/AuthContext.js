import { createContext, useContext, useEffect, useState } from "react";
import {signInWithEmailAndPassword, 
        signOut, 
        onAuthStateChanged,
} from 'firebase/auth'
import {auth} from '../firebase'
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore'

var userstoreData = []
const userstoreRef = collection(db, "userstore")

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [profile, setProfile] = useState({})
    const [userComplete, setUserComplete] = useState(false)
    const [profilePic, setProfilePicture] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const changeUserComplete = (choice) => {
        return setUserComplete(choice)
    }

    const changeProfilePicture = (url) => {
        return setProfilePicture(url)
    }

    async function getCurrentUserProfile(currentUser) {

        const data = await getDocs(userstoreRef);
        userstoreData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        const currentUserUID = currentUser.uid
        const currentUserProfile = userstoreData.filter(user => user.id === currentUserUID)

        if(currentUserProfile[0]){
            setProfile(currentUserProfile[0])
            console.log('HAS RECORD:')
            if(currentUserProfile[0].profileComplete === true){
                console.log('PROFILE COMPLETE')
                setUserComplete(true)
                return
            }
            else{
                console.log('PROFILE NOT COMPLETE')
                setUserComplete(false)
                return
            }
        }
        else{
            console.log('DOES NOT HAVE RECORD')
            setProfile(null)
            setUserComplete(false)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            setUser(currentUser)
            if(currentUser){
                getCurrentUserProfile(currentUser);
                if(currentUser.photoURL){
                    setProfilePicture(currentUser.photoURL)
                }
            }
        })
        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <UserContext.Provider value={{user, logout, signIn, profile, profilePic, changeProfilePicture, userComplete, changeUserComplete}}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}