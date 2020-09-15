<script>
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/storage";
  import "firebase/auth";

  let firebaseConfig = {
    apiKey: "AIzaSyBMu2ssMOLZnUA_kVRYQoVK8ujPUMpuUlc",
    authDomain: "form-9ddac.firebaseapp.com",
    databaseURL: "https://form-9ddac.firebaseio.com",
    projectId: "form-9ddac",
    storageBucket: "form-9ddac.appspot.com",
    messagingSenderId: "295581344421",
    appId: "1:295581344421:web:491d8c9e6a5a1b22da634c",
    measurementId: "G-P78G9NFJK6",
  };

  firebase.initializeApp(firebaseConfig);
  const init = () => {
    db = firebase.firestore();
  };
</script>

<FirebaseApp {firebase} on:initializeApp={init} />
