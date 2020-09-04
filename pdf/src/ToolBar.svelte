<script>
  import {createEventDispatcher} from 'svelte';
  const dispatch = createEventDispatcher();

  const addTextBox = () => { dispatch("message", {text:"add"})};
</script>
<div class="nav" on:click={addTextBox}>Add</div>
<style>
  .nav { 
    line-height: 48px;
    padding: 0 8px;
    height: 48px;
    display:flex;
    flex-direction: row-reverse;
    border-bottom: 1px solid #aaa;
  }
</style>
