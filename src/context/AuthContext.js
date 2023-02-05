import { createContext, useContext, useEffect, useState } from "react";
import {signInWithEmailAndPassword, 
        signOut, 
        onAuthStateChanged,
} from 'firebase/auth'
import {auth} from '../firebase'
import { db } from '../firebase';
import { getFilters, getRequests, getReports } from '../firebase';
import { collection, getDocs } from 'firebase/firestore'

var userstoreData = []
const userstoreRef = collection(db, "userstore")

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    var [user, setUser] = useState({})
    var [profile, setProfile] = useState({})
    var [userComplete, setUserComplete] = useState(null)
    var [profilePic, setProfilePicture] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')

    var [filtersLoading, setFiltersLoading] = useState(true)
    var [filters, setFilters] = useState([])

    var [selectedReport , setSelectedReport] = useState([])
    var [reportsLoading, setReportsLoading] = useState(true)
    var [reportsData, setReportsData] = useState([])
    var [onSpecificReport, setOnSpecificReport] = useState(false)

    var [selectedRequest , setSelectedRequest] = useState([])
    var [requestsLoading, setRequestsLoading] = useState(true)
    var [requestsData, setRequestsData] = useState([])
    var [onSpecificRequest, setOnSpecificRequest] = useState(false)

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
            if(currentUserProfile[0].profileComplete === true){
                setUserComplete(true)
                return
            }
            else{
                setUserComplete(false)
                return
            }
        }
        else{
            setProfile(null)
            setUserComplete(false)
        }
    }

    var fetchFilters = async () => {
        filters = await getFilters();
        setFilters(filters)
        setFiltersLoading(false);
    }

    var fetchReports = async () => {
        reportsData = await getReports(null);
        setReportsData(reportsData);
        setReportsLoading(false);
    }

    var fetchRequests = async () => {
        requestsData = await getRequests(null);
        setRequestsData(requestsData);
        setRequestsLoading(false);        
    }

    var getValueLabel = (group, valueInput) => {
        //sectors
        if(valueInput){
            if(group === 'sectors'){
                let sectorsMapped = filters[0].options.map(sector => { return sector.value });

                var sectorsSplit = valueInput.split(' ');
                var labels = []

                for(var sectorSplitIndex = 0; sectorSplitIndex < sectorsSplit.length; sectorSplitIndex++){
                    labels[sectorSplitIndex] = filters[0].options[sectorsMapped.indexOf(sectorsSplit[sectorSplitIndex])].label;
                }
                if(!labels){
                    return valueInput
                }
                return labels
            }

            //rating
            else if(group === 'rating'){
                let ratingsMapped = filters[1].options.map(rating => { return rating.value });
                let index = ratingsMapped.indexOf(valueInput)
                if(index < 0){
                    return valueInput
                }
                return filters[1].options[index].label
            }

            //stage
            else if(group === 'stage'){
                let stagesMapped = filters[2].options.map(stage => { return stage.value });
                let index = stagesMapped.indexOf(valueInput)
                if(index < 0){
                    return valueInput
                }
                return filters[2].options[index].label
            }

            //status
            else if(group === 'status'){
                let statusMapped = filters[3].options.map(status => { return status.value });
                let index = statusMapped.indexOf(valueInput)
                if(index < 0){
                    return valueInput
                }

                return filters[3].options[index].label
            }
        }
        else{
            return
        }
    }

    useEffect(() => {
        fetchFilters()
        fetchReports()
        fetchRequests()

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
        <UserContext.Provider value={{user, logout, signIn, getCurrentUserProfile, profile, profilePic, changeProfilePicture, userComplete, changeUserComplete, filtersLoading, filters, reportsLoading, setReportsLoading, reportsData, setReportsData, selectedReport, setSelectedReport, onSpecificReport, setOnSpecificReport, requestsData, setRequestsData, requestsLoading, selectedRequest, setSelectedRequest, setRequestsLoading, onSpecificRequest, setOnSpecificRequest, getValueLabel}}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}