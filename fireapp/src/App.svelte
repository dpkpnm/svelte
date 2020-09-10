<script>
  import { FirebaseApp, User, Doc, UploadTask } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/storage";
  import "firebase/auth";
  import shortid from "shortid";
  import Upload from "./Upload.svelte";
  import PSPDFKit from "./PSPDFKit.svelte";

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
  let path = "2.pdf";
  let file;
  let db;
  let errorMsg = "";
  const LICENSE_KEY =
    "wwh0n-lV5SBk8FvT1LY2G15EgHqEEdiICSsvZur6ivQ9FpOyMz0Lq9tQyUmnFKKi6wbINNhaBRJOdt9T9zsVQFCNZVfJpfr88GaFajigQMkiyvLmPqess1AwzFUeq3LhQRngItZOBS17b7ZHeWIRJTItmrFBBq4xXZKVMx2IcjHdMFSdm6Gy0i9vdIAg7i0e70U96wHvxJW5QNAcWHGYzPkZ8btKW-h-Zv_uQ3iV2-TJqq58-nLRTn6zFMM1fd1Hh3dq9-tSoHSxSel1huX1j5gPlQNwtBf5l6Iw4Bz94Ty1JhQ9G_thTeAnhQkDu9CcfGnSofLpdMfV7OPKTORF_9kzS9-_C04baxdLHUWJC7eo44iTR1u8VtwxSyGo9zu3Hm3EuoXsOYqs3VpMKPfUq2Obvi6b0l_eFxbvfI7NttgaXP9wxJ7uMSetGn8PMkw5";
  const init = () => {
    db = firebase.firestore();
  };
  const getExtension = (fileName) =>
    fileName ? fileName.substr(fileName.lastIndexOf(".") + 1) : "";
  const uploadFile = ({ detail }) => {
    file = detail.files[0];
    path = `${shortid()}.${getExtension(file.name)}`;
    db.doc(`forms/${path}`).set({ test: 1 });
  };
  const handleClick = (e) => {
    fields = [...fields, { x: e.offsetX - 5, y: e.offsetY - 10, title: "" }];
  };
</script>

<div style="height: 100vh; width: 100vw">
  <FirebaseApp {firebase} on:initializeApp="{init}">
    <User let:user let:auth>hello </User>
  </FirebaseApp>
</div>

<style>
  .pdfwrapper {
    position: relative;
    height: 100%;
  }
</style>
