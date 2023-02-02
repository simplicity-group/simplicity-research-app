// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, updateProfile} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUxuAkhANfbtDgf1xfDSR5dLVYxHC6dRQ",
    authDomain: "simplicity-research-app.firebaseapp.com",
    projectId: "simplicity-research-app",
    storageBucket: "simplicity-research-app.appspot.com",
    messagingSenderId: "675528585352",
    appId: "1:675528585352:web:07284e7942db12d8fd2f3d",
    measurementId: "G-NRZ36QV40E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
export const db = getFirestore(app);
export const auth = getAuth(app);

export async function getFilters(){
    var filters = []
    const filtersRef = collection(db, "filters")

    var data = await getDocs(filtersRef);
    filters = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return filters
}

export async function upload(file, currentUser) {
    const fileRef = ref(storage, currentUser.uid);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, {photoURL})
    return photoURL
}

export async function getReports(filter){
    var allReports = []
    const reportsRef = collection(db, "reports")
    var data = await getDocs(reportsRef);
    allReports = data.docs.map((doc) => ({...doc.data(), id: doc.id}));

    if(filter){

        //Split filters
        var sectorsFilter = filter[0].options
        let sectorsFilterMapped = sectorsFilter.map(sector => { return sector.value });
        var ratingFilter = filter[1].options
        let ratingFilterMapped = ratingFilter.map(rating => { return rating.value });
        var stageFilter = filter[2].options
        let stageFilterMapped = stageFilter.map(stage => { return stage.value });

        //Filter for stage & rating
        const filteredReports = allReports.filter(report => 
                                                    stageFilterMapped.includes(report.stage) ||
                                                    ratingFilterMapped.includes(report.rating) //||
                                                    //report.sectors.split(' ').includes(sectorsFilterMapped) 
                                                )        
        console.log(filteredReports)

        return filteredReports
    }
    else{
        return allReports
    }
}

export async function getRequests(filter){
    var requests = []
    const requestsRef = collection(db, "requests")

    if(filter){
        console.log('Filtered Requests')
        return requests
    }
    else{
        console.log('All requests')
        var data = await getDocs(requestsRef);
        requests = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        return requests
    }
}

export default app