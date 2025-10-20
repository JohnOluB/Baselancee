
import { FirebaseOptions, initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

function initializeFirebase() {
    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    } else {
        return getApp();
    }
}

export const app = initializeFirebase();
