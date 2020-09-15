<script>
  import { Collection } from "sveltefire";
  import { navigate } from "svelte-routing";
</script>

<div class="h-100 mw5 w-25 bg-near-black near-white pa4">
  <h1 class="f3 tracked-mega fw9">FORMULA</h1>
  <h2 class="flex f7 tracked mb5">
    <span>UPLOAD</span>
    <span class="ph2 mb2">.</span>
    <span>SEARCH</span>
    <span class="ph2">.</span>
    <span>LOGOUT</span>
  </h2>
  <Collection path={`forms`} let:data={forms}>
    <ul class="f7 pl3 list mb5">
      {#each forms as form}
        <li
          class="pv2 lh-copy"
          on:click={() => {
            navigate(`/form/${form.id}`);
          }}>
          {form.id}
        </li>
      {/each}
    </ul>
  </Collection>
</div>
