<script>
  import { FirebaseApp, User, Doc, Collection, StorageRef,fileDownloadStore } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/storage";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  import PSPDFKit from './PSPDFKit.svelte';

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
  let url = "";

  firebase.initializeApp(firebaseConfig);
  const showPdf = (path) => {
    let store = fileDownloadStore(path);
    store.subscribe((result) =>  {
      if(result)
        url = result.url;
    });
  }
  
</script>
<main class="flex h-100 code">
  <FirebaseApp {firebase}>
    <div class="h-100 mw5 w-25 bg-near-black near-white pa4">
    <h1 class="f3 tracked-mega fw9">FORMULA</h1>
    <h2 class="flex f7 tracked mb5">
      <span>UPLOAD</span>
      <span class="ph2 mb2">.</span>
      <span>SEARCH</span>
      <span class="ph2">.</span>
      <span>LOGOUT</span>
    </h2>
    <h3 class="f6 tracked fw9 ttu">My Forms</h3>
    <ul class="f7 pl3 list mb5">
    <User let:user let:auth>
      <Collection
        path="forms"
        let:data={comments}
        let:ref={commentsRef}
        traceId={'readComments'}
        log>
      {#each comments as comment}
        <li class="lh-copy pv2" on:click={showPdf(comment.id)}>{comment.id}</li>
      {/each}
      </Collection>
    </User>
    </ul>
    </div>
    <div>
      <PSPDFKIT path={url} />
    </div>
  </FirebaseApp>
</main>
