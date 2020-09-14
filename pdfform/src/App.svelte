<script>
  import { FirebaseApp, User, Doc, Collection, StorageRef,fileDownloadStore } from "sveltefire";
  import PdfViewer from 'svelte-pdf'
  import firebase from "firebase/app";
  import shortid from "shortid";
  import "firebase/firestore";
  import "firebase/storage";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  import Pdf from "./Pdf.svelte";
  import {form, saveForm} from "./store";
import AutoComplete from "simple-svelte-autocomplete";

const colors = ["Lastname", "Firstname", "Date of birth", "Address", "City", "State", "Zip"];
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
  let fields, forms, formsRef, formId, db, url="", target, selectedForm={};
  let isDetail = false;
  
  form.subscribe(val => {
    selectedForm=val;
    fields = selectedForm.fields || [];
    console.log(fields);
  });

  saveForm.subscribe(val => {
    if(val)
      db.doc(`forms/${formId}`).set({ fields:selectedForm.fields||[] });
  });
  
  const init = () => {
    db = firebase.firestore();
    db.collection('forms').get().then(data => {forms=data.docs;});
  };

  firebase.initializeApp(firebaseConfig);
  const showPdf = (path) => {
    isDetail = true;
    let store = fileDownloadStore(path);
    let temp=[];
    formId = path;
    store.subscribe((result) =>  {
      if(result)
        url = result.url;
    });
    db.doc(`forms/${path}`).get().then((data) => {
      temp = data.data().fields;
      console.log(temp);
      form.set({id:path, fields:temp || [] });
    });
  
    form.set({id:path, fields:temp});
    console.log(form);
  }
  
  const addField = (field) => {
    fields = fields || [];
    console.log(field);
    let x = field ? field.x : 0;
    let y = field ? field.y-10: 0;
    fields.push({id:shortid(), x:y, y:y, field:"fieldname", value:"New"});
    form.set({...selectedForm, fields});
  }

  const resetForm = () => {
    fields = [];
    isDetail = false;
  }
  
</script>
  <main class="flex h-100 code">
    <FirebaseApp {firebase} on:initializeApp={init}>
    <div class="h-100 mw5 w-25 bg-near-black near-white pa4">
    <h1 class="f3 tracked-mega fw9">FORMULA</h1>
    <h2 class="flex f7 tracked mb5">
      <span>UPLOAD</span>
      <span class="ph2 mb2">.</span>
      <span>SEARCH</span>
      <span class="ph2">.</span>
      <span>LOGOUT</span>
    </h2>
    <h3 class="f6 tracked fw9 ttu">
      {#if isDetail}
      <span on:click={resetForm}> - </span>Fields <span on:click={addField}>+</span>
      {:else}
        My Forms
      {/if}
    </h3>
    <ul class="f7 pl3 list mb5">
     {#if isDetail}
        {#each fields as field}
        <li class="lh-copy pv2 flex">
          <span class="mt1"><AutoComplete items={colors} class="bg-silver" bind:value={field.name} /></span>
          <span contenteditable=true class="pa1">{field.value}</span></li>
        {/each}
     {:else if forms}
        {#each forms as form}
          <li class="lh-copy pv2" on:click={() => showPdf(form.id)}>{form.id}</li>
        {/each}
      {/if}
    </ul>
    </div>
    <div class="target vh-100 w-100" bind:this={target}>
      {#if url.length>0 }
      <Pdf {url} {addField} />
      {/if}
    </div>
  </FirebaseApp>
</main>
