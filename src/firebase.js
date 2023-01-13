// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth, updateProfile} from "firebase/auth";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

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

export const auth = getAuth(app);

export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid);
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, {photoURL})

    setLoading(false);
    alert('uploaded');

}

export default app