<script>
  import TextBox from './TextBox.svelte';
  import ToolBar from './ToolBar.svelte';
  var boxes = [];
  const handleMessage = (event) => {
    boxes= [...boxes, ""];
  };
</script>

<main>
  <ToolBar on:message="{handleMessage}"></ToolBar>
  {#each boxes as box}
    <TextBox on:message={el => console.log(el)}>{box}</TextBox>
  {/each}
</main>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  main {
    width: 100vw;
    height: 100vh;
  }
</style>
