<script>
  import { onMount } from "svelte";
  import { Doc, fileDownloadStore } from "sveltefire";
  import { Link } from "svelte-routing";
  import pdfjs from "pdfjs-dist";
  import shortid from "shortid";
  import interact from "interactjs";
  import ArrowLeft from "svelte-material-icons/ArrowLeft.svelte";
  import ContentSave from "svelte-material-icons/ContentSave.svelte";
  import Plus from "svelte-material-icons/Plus.svelte";
  import PdfViewer from "svelte-pdf";
  import AutoComplete from "simple-svelte-autocomplete";

  export let id;
  let canvas, canvasWrapper, url, fields, fieldsRef, title;
  let metadata = [
    "FirstName",
    "LastName",
    "PAN",
    "Adhaar",
    "Date of Birth",
    "Nationality",
  ];
  let store = fileDownloadStore(id);
  async function loadPdf(path) {
    console.log(path);
    const pdf = await pdfjs.getDocument(path).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 0.8 });
    const ctx = canvas.getContext("2d");
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.style.width = viewport.width;
    canvas.style.height = viewport.height;
    canvasWrapper.style.width = viewport.width * devicePixelRatio + "px";
    canvas.width = viewport.width * devicePixelRatio;
    canvasWrapper.style.height = viewport.height * devicePixelRatio + "px";
    canvas.height = viewport.height * devicePixelRatio;
    const transform = [devicePixelRatio, 0, 0, devicePixelRatio, 0, 0];
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport,
      transform: transform,
    };
    page.render(renderContext);
  }

  const itemStyle = (item) => {
    return `transform: translate(${item.x}px, ${item.y}px);`;
  };

  const dragMoveListener = (event) => {
    var target = event.target;
    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    target.style.webkitTransform = target.style.transform =
      "translate(" + x + "px, " + y + "px)";
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  };

  interact(".item").draggable({
    inertia: true,
    listeners: {
      move: dragMoveListener,
      end(event) {
        changeAnnotation(event);
      },
    },
  });

  const changeAnnotation = (event) => {
    let target = event.target;
    if (target.children.length == 0) target = target.parentElement;
    let value = target.children[0].innerText;
    var x = parseFloat(target.getAttribute("data-x")) || 0;
    var y = parseFloat(target.getAttribute("data-y")) || 0;
    var id = target.getAttribute("data-id");
    var key = target.getAttribute("data-key");
    var name = target.getAttribute("data-name");
    fields[key] = { x, y, value, id, name };
    //form.set({ ...selectedForm, fields: fieldsData });
  };

  const selectAnnotation = (event) => {
    //isEditing.set(true);
  };

  onMount(() => {
    store.subscribe((result) => {
      if (result) {
        url = result.url;
        console.log(url);
        loadPdf(url);
      }
    });
  });
</script>

<style>
  .item:hover,
  .item:focus {
    background: rgba(128, 0, 0, 0.1);
  }
  .item {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    padding: 8px 8px 4px;
  }
  .item div {
    outline: none;
  }
</style>

<Doc
  path={`forms/${id}`}
  on:data={(e) => {
    fields = e.detail.data.fields;
    title = e.detail.data.title || id;
  }}
  on:ref={(e) => {
    fieldsRef = e.detail.ref;
  }}>
  <div class="h-100 mw5 w-25 bg-near-black near-white pa4">
    <h1 class="flex f3 tracked-mega fw9 mb5">
      <Link to="/form">
        <ArrowLeft width="24" />
      </Link>
      <span>FIELDS</span>
      <span
        on:click={() => {
          fieldsRef.set({ fields, title });
        }}>
        <ContentSave />
      </span>
    </h1>
    <span contenteditable="true" bind:textContent={title}>{id}</span>
    <span
      on:click={() => {
        fields = [...fields, { id: shortid(), x: 0, y: 0, value: 'New', name: 'New' }];
      }}>
      <Plus />
    </span>
    <ul class="f7 pl3 list mb5">
      {#each fields as field}
        <li class="lh-copy pv2">
          <AutoComplete
            items={metadata}
            class="bg-silver"
            bind:selectedItem={field.name}
            bind:value={field.name} />
          <div
            contenteditable="true"
            class="pa1"
            bind:textContent={field.value} />
        </li>
      {/each}
    </ul>
  </div>
  <div class="h-100 w-75 pa4 bg-near-white tc">
    <div class="relative" bind:this={canvasWrapper}>
      <canvas id="pdf-canvas" bind:this={canvas} class="aspect-ratio--object" />
      <div class="aspect-ratio--object">
        {#each fields as item, key}
          <div
            class="item"
            data-name={item.name}
            data-key={key}
            data-id={item.id}
            data-x={item.x}
            data-y={item.y}
            style={itemStyle(item)}>
            <div
              contenteditable="true"
              bind:textContent={item.value}
              on:focus={(e) => selectAnnotation(e)}
              on:blur={(e) => {
                changeAnnotation(e, item);
              }} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</Doc>
