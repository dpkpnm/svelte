<script>
  import {
    FirebaseApp,
    User,
    Doc,
    Collection,
    UploadTask,
    StorageRef,
  } from "sveltefire";
  import PdfViewer from "svelte-pdf";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/storage";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  import shortid from 'shortid';
  import Upload from "./Upload.svelte";

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
  const init = () => { db = firebase.firestore();}
  const getExtension = fileName => fileName ? fileName.substr(fileName.lastIndexOf('.') + 1):'';
  const uploadFile = ({detail}) => {
    file = detail.files[0];
    path = `${shortid()}.${getExtension(file.name)}`;
    db.doc(`forms/${path}`).set({test:1})
  }
</script>

<main>
  <FirebaseApp {firebase} on:initializeApp={init}>
    <User let:user let:auth> </User>
    <Upload on:input={uploadFile} />
    {#if file}
    <UploadTask {file} {path} let:task let:snapshot let:downloadURL={url} >
      {100*snapshot.bytesTransferred/snapshot.totalBytes} %
      <div slot="complete">
        <PdfViewer {url} />
      </div>
      <div slot="fallback">Error</div>
    </UploadTask>
    {/if}
  </FirebaseApp>
</main>
