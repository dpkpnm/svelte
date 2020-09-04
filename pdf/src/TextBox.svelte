<script>
  import { onMount } from 'svelte';
  import interact from 'interactjs';

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
      end(event) {},
    },
  });
</script>
<span contenteditable="true" class="item">hello</span>
<style>
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
