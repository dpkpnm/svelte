<script>
  import interact from 'interactjs';
  import {form, isEditing, saveForm} from "./store";
  
  let selectedForm, fields
  form.subscribe(val => {
    selectedForm = val;
    fields=val.fields
  });
  console.log(fields); 
  const itemStyle = (item) => {
    return `transform: translate(${item.x}px, ${item.y}px);`; 
  }

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
        changeAnnotation(event);
      },
    },
  });

  const changeAnnotation = (event) => {
    let target = event.target;
    if(target.children.length ==0)
      target = target.parentElement;
    let value = target.children[0].innerText;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) ;
    var y = (parseFloat(target.getAttribute('data-y')) || 0);
    var id = target.getAttribute('data-id');
    var key = target.getAttribute('data-key');
    var name = target.getAttribute('data-name');
    fields[key]={x,y,value,id,name};
    form.set({...selectedForm,fields:fields});
    isEditing.set(false);
    saveForm.set(true);
  }
  const selectAnnotation = (event) => {
    isEditing.set(true);
  }
</script>
{#if fields}
{#each fields as item, key}
  <div class="item" data-name={item.name} data-key={key} data-id={item.id} data-x={item.x} data-y={item.y} style={itemStyle(item)}>
    <div contenteditable="true" on:focus={selectAnnotation} on:blur={changeAnnotation} >{item.value}</div>
  </div>
{/each}
{/if}
<style>
  .item:hover, .item:focus {
    background: rgba(128,0,0,0.1);
  }
  .item {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    padding: 8px 8px 4px;
  }
  .item div {outline:none;}
</style>
