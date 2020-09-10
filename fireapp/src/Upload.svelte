<script>
  import { createEventDispatcher } from "svelte";
  function getFilesFromDropEvent({ dataTransfer: { files, items } }) {
    return files.length
      ? [...files]
      : items
          .filter(({ kind }) => kind === "file")
          .map(({ getAsFile }) => getAsFile());
  }

  function getFilesFromInputEvent({ target }) {
    const files = target.files ? [...target.files] : [];
    target.value = "";
    return files;
  }
  export let multiple = true;
  let dragging = false;
  const dispatch = createEventDispatcher();
  function startDragging() {
    dragging = true;
  }
  function stopDragging() {
    dragging = false;
  }
  const onFile = (getFilesFunction) => (event) => {
    stopDragging();
    const files = getFilesFunction(event);
    if (files.length) {
      dispatch("input", { files: multiple ? files : files[0] });
    }
  };
</script>
<style>
  input {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
  }
  label:hover {
    cursor: pointer;
  }
  div {
    min-width: 200px;
    border: 1px solid red;
    min-height: 120px;
    padding: 16px;
    border: 1px dashed red;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<label
  class:dragging
  on:drop|preventDefault="{onFile(getFilesFromDropEvent)}"
  on:dragover|preventDefault="{startDragging}"
  on:dragleave|preventDefault="{stopDragging}"
>
  <slot {dragging}>
    <div>Upload form</div>
  </slot>
  <input type="file" {multiple} on:input="{onFile(getFilesFromInputEvent)}" />
</label>
