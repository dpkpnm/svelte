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

let db;
const formUpdate = (formId, val) => {
  db.doc(`forms/${formId}`).set(val);
};

export const init = () => {
  db = firebase.firestore();
  db.collection("forms")
    .get()
    .then((data) => {
      forms = ata.docs;
      console.log(forms);
    });
};

firebase.initializeApp(firebaseConfig);
const showPdf = (path) => {
  let store = fileDownloadStore(path);
  let temp;
  formId = path;
  debugger;
  store.subscribe((result) => {
    if (result) url = result.url;
  });
  db.doc(`forms/${path}`)
    .get()
    .then((data) => {
      temp = data.data().fields;
      form.set({ id: path, fields: temp });
    });

  form.set({ id: path, fields: temp });
  console.log(form);
};
