<script>
  import { FirebaseApp, Collection } from "sveltefire";
  import { Router, Link, Route } from "svelte-routing";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/storage";
  import { firebaseConfig } from "./utils";
  import home from "./home.svelte";
  import form from "./form.svelte";
  import formView from "./formView.svelte";

  export let url = "";
  firebase.initializeApp(firebaseConfig);
</script>

<main class="flex code h-100">
  <FirebaseApp {firebase}>
    <Router {url}>
      <Route path="form/:id" component={formView} />
      <Route path="form" component={form} />
      <Route path="/" component={home} />
    </Router>
  </FirebaseApp>

</main>

