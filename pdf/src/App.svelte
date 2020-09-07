<script>
  import TextBox from './TextBox.svelte';
  import ToolBar from './ToolBar.svelte';
  import PdfViewer from 'svelte-pdf'
  var boxes = [];
  const handleMessage = (event) => {
    boxes= [...boxes, ""];
  };
</script>

<main>
  <ToolBar on:message="{handleMessage}"></ToolBar>
  <h3>Upload new pdf form</h3>
  <PdfViewer url='49607.pdf' />
  <p>lorem epsum a;slkfj as;fdlkj this is water and air and land trees</p>
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
