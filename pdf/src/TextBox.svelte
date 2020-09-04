<script>
  import { onMount } from 'svelte';
  import interact from 'interactjs';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let position = { x: 0, y: 0 };
  let name = 'Title';
  let value = '';

  const dragMoveListener = (event) => {
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  };

  interact('.item').draggable({
    inertia: true,
    listeners: {
      move: dragMoveListener,
      end(event) {
        var target = event.target;
        position.x = target.getAttribute('data-x');
        position.y = target.getAttribute('data-y');
        value = target.childNodes[2].innerText;
        dispatch('message', { ...position, name, value });
      },
    },
  });
</script>
<div class="item">
  <div class="title">Title</div>
  <span contenteditable="true">hello</span>
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
    padding: 4px 8px;
    border-radius: 4px;
  }
  .item:hover {
    outline: 1px dashed #ef9a9a;
  }
  .item {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    padding: 8px;
  }
</style>
