// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, updateProfile} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import {v4} from 'uuid';

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
    const fileRef = ref(storage, `userstorage/profilepictures/${v4()}`);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, {photoURL})
    return photoURL
}

export async function getReports(){
    var allReports = []
    const reportsRef = collection(db, "reports")
    var data = await getDocs(reportsRef);
    allReports = data.docs.map((doc) => ({...doc.data(), id: doc.id}));

    //Valid data only
    var filteredReports = allReports.filter(report => {
        return (report.name !== '' && report.name !== null && report.rating !== '' && report.rating !== null)
    });
    return filteredReports
}

export async function getRequests(){
    var allRequests = []
    const requestsRef = collection(db, "requests")
    var data = await getDocs(requestsRef);
    allRequests = data.docs.map((doc) => ({...doc.data(), id: doc.id}));

    //Valid data only
    var filteredRequests = allRequests.filter(request => {
        return (request.name !== '' && request.name !== null && request.status !== '' && request.status !== null)
    });

    return filteredRequests
}

export async function submitRequest(projectName, projectWebsite, pitchdeck, whitepaper){

    const requestsRef = collection(db, "requests")
    
    try{
        //Pitchdeck
        const pitchdeckRef = ref(storage, `requestsstorage/pitchdecks/${v4()}`)
        await uploadBytes(pitchdeckRef, pitchdeck);
        const pitchdeckURL = await getDownloadURL(pitchdeckRef);
        
        //Whitepaper
        const whitepaperRef = ref(storage, `requestsstorage/whitepapers/${v4()}`)
        await uploadBytes(whitepaperRef, whitepaper);
        const whitepaperURL = await getDownloadURL(whitepaperRef);

        //Request document
        const requestDocResponse = await addDoc(requestsRef, { name:projectName, status: 'in_progress', website:projectWebsite, whitepaperURL: whitepaperURL, pitchdeckURL: pitchdeckURL });
        const requestDocRef = doc(db, 'requests', requestDocResponse.id)
        const requestDoc = await getDoc(requestDocRef);
        
        return requestDoc.data()
    
    } catch (e) {
        alert(e);
    }
}

export async function completeAccount(user, profile, photo, selectedStages, selectedSectors){

    const userstoreRef = collection(db, "userstore")

    if(profile){
        const docRef = doc(userstoreRef, profile.id);
        //setting row that already exists
        try {
          await updateDoc(docRef, {
            profileComplete: true,
            stagesInterest: selectedStages,
            sectorsInterest: selectedSectors
          });
          const photoURL = await upload(photo, user);

          return photoURL;
        }
        catch (e) {
          alert(e.message)
        }
      }
      else{
        //creating new profile row
        try{
          await setDoc(doc(userstoreRef, user.uid), {
            fname:'', 
            lname:'', 
            profileComplete: true, 
            stagesInterest: selectedStages, 
            sectorsInterest: selectedSectors 
        }); 
            const photoURL = await upload(photo, user);

          return photoURL;
        } catch (e) {
          console.log(e.message)
        }
      }
}

export async function updateUserProfile(user, profile, photo, selectedStages, selectedSectors){
    const userstoreRef = collection(db, "userstore")
    const docRef = doc(userstoreRef, profile.id);
    try {
        await updateDoc(docRef, {
          stagesInterest: selectedStages,
          sectorsInterest: selectedSectors
        });
        const photoURL = await upload(photo, user);

        return photoURL;
    }
        catch (e) {
        alert(e.message)
    }
}

export default app