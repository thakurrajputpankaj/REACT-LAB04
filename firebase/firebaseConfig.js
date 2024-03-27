import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBucGQ3XnpxxvM2OqSdhapAGB3BOPFWETc",
  authDomain: "react-final-project-b8608.firebaseapp.com",
  databaseURL: "https://react-final-project-b8608-default-rtdb.firebaseio.com",
  projectId: "react-final-project-b8608",
  storageBucket: "react-final-project-b8608.appspot.com",
  messagingSenderId: "186740694057",
  appId: "1:186740694057:web:497a110bc1d86f65095038"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
