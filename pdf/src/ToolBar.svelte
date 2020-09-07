<script>
  import { createEventDispatcher } from 'svelte';
  import { Button } from './mui';
  const dispatch = createEventDispatcher();

  const addTextBox = () => {
    dispatch('message', { text: 'add' });
  };
  const increaseSize = () => {
    dispatch('message', { text: 'size' });
  };
  const changeToCaps = () => {
    dispatch('message', { text: 'caps' });
  };
</script>
<div class="nav">
  <button on:click="{changeToCaps}">Caps</button>
  <button on:click="{increaseSize}">Size</button>
  <button on:click="{addTextBox}" class="button-primary">add</button>
</div>
<style>
  .nav {
    line-height: 48px;
    padding: 0 8px;
    height: 48px;
    display: flex;
    flex-direction: row-reverse;
  }
  .nav > div,
  .nav > button {
    margin: 0 8px;
  }
</style>
