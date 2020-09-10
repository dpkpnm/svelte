<script>
  import { onMount } from "svelte";
  import interact from "interactjs";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let x = 0;
  export let y = 0;
  let name = "Title";
  let value = "";

  const dragMoveListener = (event) => {
    var target = event.target;
    var dx = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    var dy = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    target.style.webkitTransform = target.style.transform =
      "translate(" + dx + "px, " + dy + "px)";
    target.setAttribute("data-x", dx);
    target.setAttribute("data-y", dy);
  };

  interact(".item").draggable({
    inertia: true,
    listeners: {
      move: dragMoveListener,
      end(event) {
        var target = event.target;
        x = target.getAttribute("data-x");
        y = target.getAttribute("data-y");
        value = target.childNodes[target.childNodes.length - 1].innerText;
        dispatch("message", { x, y, name, value });
      },
    },
  });
</script>
<div
  class="item"
  contenteditable
  data-x="{x}"
  data-y="{y}"
  style="{`transform:translate(${x}px,${y}px);`}"
>
  <!-- <div class="title">Title</div> -->
  <span contenteditable="true"></span>
</div>
<style>
  .title {
    margin-top: -1rem;
    position: absolute;
    font-size: 0.6rem;
    top: 0;
    left: 0;
    background: #01579b;
    color: #fff;
    border-radius: 4px;
  }
  .item:hover {
    outline: 1px dashed #ef9a9a;
  }
  .item {
    outline: 1px dashed #ef9a9a;
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    padding-right: 16px;
    color: red;
  }
</style>
