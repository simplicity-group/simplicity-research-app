// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, updateProfile} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes, uploadString} from "firebase/storage";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import {v4} from 'uuid';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Dates
const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = monthNames[now.getMonth()];

// Token Data
const defaultSubscriptionAmount = 20;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
export const db = getFirestore(app);
export const auth = getAuth(app);

// Refs
const userstoreRef = collection(db, "userstore")
const filtersRef = collection(db, "filters")

export async function getFilters(){
  var filters = []
  var data = await getDocs(filtersRef);
  filters = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
  return filters
}

export async function transactTokens(cost, uid){
  const tokensRef = doc(userstoreRef, uid, "tokens", currentYear.toString());

  const currentYearTokens = await getDoc(tokensRef);
  const currentYearTokensData = currentYearTokens.data()
  const currentMonthTokens = currentYearTokensData[currentMonth]

  if(currentMonthTokens.remaining >= cost){
    const newRemaining = currentMonthTokens.remaining - cost;

    await updateDoc(tokensRef, {
      [currentMonth] : {
        purchased: currentMonthTokens.purchased,
        remaining: newRemaining,
        subscription: defaultSubscriptionAmount
      }
    }, 
    { merge: true }
    );

    return [true, newRemaining]
  }
  else{
    return false
  }
}

export async function updateUserTokens(uid, allTokenData){

  const currentYearTokensRef = doc(userstoreRef, uid, "tokens", currentYear.toString())

  var currentYearTokens = allTokenData.filter(obj => {
    return obj.year === currentYear.toString()
  })

  //Current year DOES NOT exist
  if(currentYearTokens.length <= 0){

    //Get last year
    const lastYear = currentYear-1;
    var lastYearTokens = allTokenData.filter(obj => {
      return obj.year === lastYear.toString()
    })    
    
    //Work out when the last month was logged
    var lastMonthIndex = 0;
    //Check through all the months with what is logged on the userstore and get the index of the latest month
    for (var i = 0; i < monthNames.length; i++){
      if(lastYearTokens[0][monthNames[i]]){
        if(lastMonthIndex < i){
          lastMonthIndex = i;
        }
      }
    }

    const lastMonthObj = lastYearTokens[0][monthNames[lastMonthIndex]]
    const lengthToEndOfLastYear = 12 - lastMonthIndex-1;
    const lengthToCurrentMonth = monthNames.indexOf(currentMonth)
    const differenceBetweenMonths = lengthToEndOfLastYear + lengthToCurrentMonth;

    //If the user hasn't updated token obj for 2 or more months
    if (differenceBetweenMonths >= 2){
      additionalRemaining = defaultSubscriptionAmount*2
      await setDoc(currentYearTokensRef, {
        [currentMonth] : {
          purchased: 0,
          remaining: additionalRemaining,
          subscription: defaultSubscriptionAmount
        }
      }, 
      { merge: true }
      );  
    }
    //It's only been a month use what they have previously remaining
    else{
      if(lastMonthObj.remaining > 20){
        additionalRemaining = 20
      }
      else{
        additionalRemaining = lastMonthObj.remaining
      }
      await setDoc(currentYearTokensRef, {
        [currentMonth] : {
          purchased: 0,
          remaining: defaultSubscriptionAmount+additionalRemaining,
          subscription: defaultSubscriptionAmount
        }
      }, 
      { merge: true }
      );        
    }

  }
  
  //Current year DOES exist
  else{
    //Work out when the last month was logged
    var lastMonthIndex = 0;
    //Check through all the months with what is logged on the userstore and get the index of the latest month
    for (var i = 0; i < monthNames.length; i++){
      if(currentYearTokens[0][monthNames[i]]){
        if(lastMonthIndex < i){
          lastMonthIndex = i;
        }
      }
    }

    const lastMonthObj = currentYearTokens[0][monthNames[lastMonthIndex]]
    var additionalRemaining = 0
    const currentMonthIndex = monthNames.indexOf(currentMonth)
    const differenceBetweenMonths = currentMonthIndex - lastMonthIndex

    //If the user hasn't updated token obj for 2 or more months
    if (differenceBetweenMonths >= 2){
      additionalRemaining = defaultSubscriptionAmount*2
      await setDoc(currentYearTokensRef, {
        [currentMonth] : {
          purchased: 0,
          remaining: additionalRemaining,
          subscription: defaultSubscriptionAmount
        }
      }, 
      { merge: true }
      );  
    }
    //It's only been a month use what they have previously remaining
    else{
      if(lastMonthObj.remaining > 20){
        additionalRemaining = 20
      }
      else{
        additionalRemaining = lastMonthObj.remaining
      }
      await setDoc(currentYearTokensRef, {
        [currentMonth] : {
          purchased: 0,
          remaining: defaultSubscriptionAmount+additionalRemaining,
          subscription: defaultSubscriptionAmount
        }
      }, 
      { merge: true }
      );        
    }
  }
  return additionalRemaining
}

export async function getUserTokens(uid){
  
  //Get all token history 
  const allTokensRef = collection(userstoreRef, uid, "tokens")
  const allTokens = await getDocs(allTokensRef);
  const allTokenData = allTokens.docs.map((doc) => ({year: doc.id, ...doc.data()}));

  //Get current year doc
  var currentYearTokens = allTokenData.filter(obj => {
    return obj.year === currentYear.toString()
  })
  //console.log('current year:', currentYearTokens[0])

  //Get current month obj
  if(currentYearTokens[0]){
    var currentMonthTokens = currentYearTokens[0][currentMonth]
    //console.log('current month:', currentMonthTokens)
  }
 
  //If current month exists
  if (currentMonthTokens){
    return currentMonthTokens.remaining
  }
  else{
    //call update user tokens to ensure the user has a current month value
    return await updateUserTokens(uid, allTokenData);
  }
    
}

export async function upload(file, user) {
    const fileRef = ref(storage, `userstorage/profilepictures/${v4()}`);
    await uploadString(fileRef, file, 'data_url')
    //const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(user, {photoURL})
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

export async function getPopularReports(){
  const popularReportsRef = doc(db, "homepage", "popularreports")
  const popularReports = await getDoc(popularReportsRef);
  return popularReports.data();  
}

export async function getRequests(uid){
    var allRequests = []
    const requestsRef = collection(db, "requests")
    var data = await getDocs(requestsRef);

    allRequests = data.docs.map((doc) => ({...doc.data(), id: doc.id}));

    //Valid data only
    var filteredRequests = allRequests.filter(request => {
        return (request.owner === uid && request.name !== '' && request.name !== null && request.status !== '' && request.status !== null)
    });

    return filteredRequests
}

export async function submitRequest(uid, projectName, projectWebsite, pitchdeck, whitepaper){

    const requestsRef = collection(db, "requests")
    
    try{

        //Pitchdeck
        var pitchdeckURL = ''
        if(pitchdeck){
          const pitchdeckRef = ref(storage, `requestsstorage/pitchdecks/${v4()}`)
          await uploadBytes(pitchdeckRef, pitchdeck);
          pitchdeckURL = await getDownloadURL(pitchdeckRef);
        }
      
        //Whitepaper
        var whitepaperURL = ''
        if(whitepaper){
          const whitepaperRef = ref(storage, `requestsstorage/whitepapers/${v4()}`)
          await uploadBytes(whitepaperRef, whitepaper);
          const whitepaperURL = await getDownloadURL(whitepaperRef);
        }

        //Request document
        const requestDocResponse = await addDoc(requestsRef, { name:projectName, status: 'in_progress', website:projectWebsite, whitepaperURL: whitepaperURL, pitchdeckURL: pitchdeckURL, owner: uid });
        const requestDocRef = doc(db, 'requests', requestDocResponse.id)
        const requestDoc = await getDoc(requestDocRef);

        return requestDoc.data()
    
    } catch (e) {
        alert(e);
        return null
    }
}

export async function completeAccount(user, profile, photo, selectedStages, selectedSectors){

  if(profile){
      const docRef = doc(userstoreRef, profile.id);
      const tokensRef = doc(userstoreRef, profile.id, "tokens", currentYear.toString());

      //Setting profile doc that already exists
      try {
        await updateDoc(docRef, {
          profileComplete: true,
          stagesInterest: selectedStages,
          sectorsInterest: selectedSectors
        });

        await setDoc(tokensRef, {
          [currentMonth] : {
            purchased: 0,
            remaining: 20,
            subscription: 20
          }
        }, 
        { merge: true }
        );  
        
        const photoURL = await upload(photo, user);
        return photoURL;
      }
      catch (e) {
        console.warn(e.message);
      }
    }
    else{

      //Creating new profile doc
      try{
        await setDoc(doc(userstoreRef, user.uid), {
          fname:'', 
          lname:'', 
          profileComplete: true, 
          stagesInterest: selectedStages, 
          sectorsInterest: selectedSectors 
        }); 

        const tokensRef = doc(userstoreRef, user.uid, "tokens", currentYear.toString());

        await setDoc(tokensRef, {
          [currentMonth] : {
            purchased: 0,
            remaining: 20,
            subscription: 20
          }
        }, 
        { merge: true }
        );

        const photoURL = await upload(photo, user);
        return photoURL;
      } catch (e) {
        console.warn(e.message)
      }
    }
}

export async function updateUserProfile(user, profile, photo, selectedStages, selectedSectors){
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