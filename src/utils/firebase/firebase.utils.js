// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkrqrWuJrNPv-j5-BRor6a19tQu1eAoBM",
  authDomain: "e-commerce-project-db-88223.firebaseapp.com",
  projectId: "e-commerce-project-db-88223",
  storageBucket: "e-commerce-project-db-88223.appspot.com",
  messagingSenderId: "1064548619578",
  appId: "1:1064548619578:web:0ddcdc50674c68f5b8ac03"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating a new user', error.message);
        }
    }

    return userDocRef;
}