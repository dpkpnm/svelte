<script>
  import { onMount } from 'svelte';
  import interact from 'interactjs';

  export let name;
  onMount(() => {
    interact('#test').draggable({
      listeners: {
        move(event) {
          console.log(event);
        },
      },
    });
  });
</script>

<main>
  <h1 id="test">Hello {name}! testing</h1>
</main>
