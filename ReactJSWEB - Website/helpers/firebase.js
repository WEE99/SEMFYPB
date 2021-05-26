
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import React from "react";

// if (!firebase.apps.length) {
//     firebase.initializeApp({
//         apiKey: "AIzaSyCPefc_CocfHs1BmFUeLgUayMopRXJwbAo",
//         authDomain: "salesmanagement-karuna.firebaseapp.com",
//         projectId: "salesmanagement-karuna",
//         storageBucket: "salesmanagement-karuna.appspot.com",
//         messagingSenderId: "828417235461",
//         appId: "1:828417235461:web:6f33140fda9c36b4109a6c",
//         measurementId: "G-776795GSNL"
//     });
// }

if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyDTp7kOq7aNbIPnBDLFzLzlTd_YWGLTifQ",
            authDomain: "salescustom-55472.firebaseapp.com",
            projectId: "salescustom-55472",
            storageBucket: "salescustom-55472.appspot.com",
            messagingSenderId: "332970386270",
            appId: "1:332970386270:web:e96fb4bc28437ef0f1a5cf",
            measurementId: "G-7R6D1CBVXM"
        });
        

}

var config = {
    apiKey: "AIzaSyDTp7kOq7aNbIPnBDLFzLzlTd_YWGLTifQ",
    authDomain: "salescustom-55472.firebaseapp.com",
    projectId: "salescustom-55472",
    storageBucket: "salescustom-55472.appspot.com",
    messagingSenderId: "332970386270",
    appId: "1:332970386270:web:e96fb4bc28437ef0f1a5cf",
    measurementId: "G-7R6D1CBVXM"
};
// export const secondFirebase = firebase.initializeApp(config, "Secondary");

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export {
    firebase
}
