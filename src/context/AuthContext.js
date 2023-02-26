import { createContext, useContext, useEffect, useState } from "react";
import {signInWithEmailAndPassword, 
        signOut, 
        onAuthStateChanged,
} from 'firebase/auth'
import { getFilters, getRequests, getReports, getPopularReports, db, auth, getUserTokens } from '../firebase';
import { collection, getDocs } from 'firebase/firestore'

var userstoreData = []
const userstoreRef = collection(db, "userstore")
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    var [user, setUser] = useState({})
    var [profile, setProfile] = useState({})
    var [userComplete, setUserComplete] = useState(null)
    var [profilePic, setProfilePicture] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')
    var [profileTokens, setProfileTokens] = useState(0)
    var [profileTokensLoading, setProfileTokensLoading] = useState(false)

    var [filtersLoading, setFiltersLoading] = useState(true)
    var [filters, setFilters] = useState([])

    var [selectedReport , setSelectedReport] = useState([])
    var [reportsLoading, setReportsLoading] = useState(true)
    var [reportsData, setReportsData] = useState([])
    var [popularReportsData, setPopularReportsData] = useState([])
    var [onSpecificReport, setOnSpecificReport] = useState(false)

    var [selectedRequest , setSelectedRequest] = useState([])
    var [requestsLoading, setRequestsLoading] = useState(true)
    var [requestsData, setRequestsData] = useState([])
    var [onSpecificRequest, setOnSpecificRequest] = useState(false)

    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            if(currentUser){
                getCurrentUserProfile(currentUser);
                fetchRequests(currentUser.uid)
                if(currentUser.photoURL){
                    setProfilePicture(currentUser.photoURL)
                }
            }
        })

        fetchFilters()
        fetchReports()

        return () => {
            unsubscribe()
        }
    }, [])

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
                
                setProfileTokensLoading(true);
                await fetchTokens(currentUserProfile[0].id)
                setProfileTokensLoading(false);
                
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
        //Get all reports
        reportsData = await getReports(null);
        setReportsData(reportsData);

        //Get popular reports
        const popularReportsObj = await getPopularReports();    
        const popularReportsNames = popularReportsObj.popularreports
        var filteredPopularReports = reportsData.filter(function (el) {
            return popularReportsNames.indexOf(el.name) >= 0; 
        });
        setPopularReportsData(filteredPopularReports)

        setReportsLoading(false);
    }

    var fetchRequests = async (uid) => {
        requestsData = await getRequests(uid);
        setRequestsData(requestsData);
        setRequestsLoading(false);        
    }

    var fetchTokens = async (id) => {
        const tokens = await getUserTokens(id)
        if(tokens){
            setProfileTokens(tokens);
        }
        else{
            setProfileTokens(0);
        }
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
                return <span className="bg-gray-100 text-white mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{labels}</span>       
            }

            //rating
            else if(group === 'rating'){
                let ratingsMapped = filters[1].options.map(rating => { return rating.value });
                let index = ratingsMapped.indexOf(valueInput)

                if(index < 0){
                    return valueInput
                }

                if(filters[1].options[index].label){

                    var ratingLabel = filters[1].options[index].label

                    if(ratingLabel === 'Red'){
                        return <span className="bg-red-600 text-red-100 mr-2 px-2.5 py-0.5 rounded">Red</span>
                    }
                    else if(ratingLabel === 'Amber/Red'){
                        return <span className="bg-yellow-600 text-yellow-100 mr-2 px-2.5 py-0.5 rounded border border-red-600">Amber/Red</span>
                    }
                    else if(ratingLabel == 'Amber'){
                        return <span className="bg-yellow-600 text-yellow-100 mr-2 px-2.5 py-0.5 rounded ">Amber</span>
                    }
                    else if(ratingLabel == 'Amber/Green'){
                        return <span className="bg-yellow-600 text-yellow-100 mr-2 px-2.5 py-0.5 rounded border border-green-600">Amber/Green</span>
                    }
                    else if(ratingLabel == 'Green'){
                        return <span className="bg-green-600 text-green-100 mr-2 px-2.5 py-0.5 rounded">Green</span>
                    }
                    else {
                        return filters[1].options[index].label
                    }
                }

            }

            //stage
            else if(group === 'stage'){
                let stagesMapped = filters[2].options.map(stage => { return stage.value });
                let index = stagesMapped.indexOf(valueInput)
                if(index < 0){
                    return valueInput
                }
                return <span className="bg-gray-100 text-white mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{filters[2].options[index].label}</span>       
            }

            //status
            else if(group === 'status'){
                let statusMapped = filters[3].options.map(status => { return status.value });
                let index = statusMapped.indexOf(valueInput)
                if(index < 0){
                    return valueInput
                }

                else{
                    var label = filters[3].options[index].label
                    if(label === 'In Progress'){
                        return <span className="bg-yellow-500 text-white mr-2 px-2.5 py-0.5 rounded ">{filters[3].options[index].label}</span>
                    }
                    else if(label === 'Complete'){
                        return <span className="bg-green-500 text-white mr-2 px-2.5 py-0.5 rounded">{filters[3].options[index].label}</span>
                    }
                }

                return 
            }
        }
        else{
            return
        }
    }

    return (
        <UserContext.Provider value={{user, logout, signIn, getCurrentUserProfile, profile, profilePic, changeProfilePicture, userComplete, changeUserComplete, profileTokens, profileTokensLoading, setProfileTokens, filtersLoading, filters, reportsLoading, setReportsLoading, reportsData, popularReportsData, setReportsData, selectedReport, setSelectedReport, onSpecificReport, setOnSpecificReport, requestsData, setRequestsData, requestsLoading, selectedRequest, setSelectedRequest, setRequestsLoading, onSpecificRequest, setOnSpecificRequest, getValueLabel}}>
            {children}
        </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}