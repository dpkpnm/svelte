<script>
import pdfjs from "pdfjs-dist";
import Annotations from "./Annotations.svelte";
import {isEditing} from "./store";
export let url;
export let addField;
let canvas, canvasWrapper;
let canAdd;
isEditing.subscribe(val => canAdd=!val);

async function loadPdf(path, element) {
  const pdf = await pdfjs.getDocument(path).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({scale:0.8});
  const ctx = canvas.getContext("2d");
  const devicePixelRatio = window.devicePixelRatio || 1;
  canvas.style.width = viewport.width;
  canvas.style.height = viewport.height;
  canvasWrapper.style.width = viewport.width * devicePixelRatio + "px";
  canvas.width = viewport.width * devicePixelRatio;
  canvasWrapper.style.height = viewport.height * devicePixelRatio + "px"; 
  canvas.height = viewport.height * devicePixelRatio;
  const transform = [ devicePixelRatio, 0 , 0, devicePixelRatio, 0, 0];
  const renderContext = {
    canvasContext:ctx, 
    viewport: viewport,
    transform: transform
  }
  page.render(renderContext);
}
const addAnnotation = (e) => {
  if(canAdd) {
    //addField({x:e.layerX, y:e.layerY});
    console.log(e.layerX, e.layerY);
  }
  console.log("Can Add");
}
loadPdf(url, "#pdf-canvas");
</script>
<div class="pa4 bg-near-white tc">
  <div class="relative" bind:this={canvasWrapper}>
    <canvas id="pdf-canvas" bind:this={canvas} class="aspect-ratio--object"></canvas>
    <div class="aspect-ratio--object" on:click={addAnnotation}>
      <Annotations />
    </div>
  </div>
</div>
