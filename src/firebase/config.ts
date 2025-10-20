
import { FirebaseOptions, initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
  "projectId": "studio-27276494-d8631",
  "appId": "1:95140804609:web:d9d886c175cee5f24ba800",
  "apiKey": "AIzaSyBcHHWRoZrLgP-WXNoiIsIF9HO4XdjLXIo",
  "authDomain": "studio-27276494-d8631.firebaseapp.com",
  "measurementId": "G-9T4C1JCF5W",
  "storageBucket": "studio-27276494-d8631.appspot.com",
  "messagingSenderId": "95140804609"
};

// Initialize Firebase
function initializeFirebase() {
    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    } else {
        return getApp();
    }
}

export const app = initializeFirebase();
