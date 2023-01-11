// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgiZ9urXTQekalMq6Xjys4EqJsPoYhEoA",
  authDomain: "basic-auth-3209c.firebaseapp.com",
  projectId: "basic-auth-3209c",
  storageBucket: "basic-auth-3209c.appspot.com",
  messagingSenderId: "468098529277",
  appId: "1:468098529277:web:e1f55c54a4d38192f0cb94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export const auth = getAuth(app);

export async function upload(file, currentUser, setLoading){
  const fileRef = ref(storage, currentUser.uid);
  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(currentUser, {photoURL})

  setLoading(false);
  alert('uploaded');

}

export default app