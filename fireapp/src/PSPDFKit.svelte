<script>
  import PSPDFKit from "pspdfkit";
  export let doc;
  export let licenseKey;
  export let baseUrl = "";
  export let errorMsg = "";
  let instance;
  function handlePDF(element, doc) {
    load(element, doc);
    return {
      update(doc) {
        unload(element);
        load(element, doc);
      },
      destroy() {
        unload(element);
      }
    };
  }
  async function load(container, doc) {
    try {
      const toolbar = [{"type":"sidebar-thumbnails"},{"type":"pager"},{"type":"spacer"},{"type":"text"},{"type":"print"}]
      instance = await PSPDFKit.load({
        container,
        document: doc,
        licenseKey,
        toolbarItems:toolbar
      });
      console.log(instance.defaultToolbarItems);
      instance.setViewState(viewState =>
        viewState.set("interactionMode", PSPDFKit.InteractionMode.TEXT)
      );
      instance.addEventListener("annotations.didSave", async () => {
        const instantJSON = await instance.exportInstantJSON();
        console.log(instantJSON);
      });
      errorMsg = "";
    } catch (error) {
      unload(container);
      errorMsg = error.message;
    }
  }
  function unload(container) {
    if (instance) {
      PSPDFKit.unload(instance);
      instance = null;
    } else {
      PSPDFKit.unload(container);
    }
  }
</script>

<style>
  .container {
    height: 100%;
  }
  .PSPDFKit-Toolbar {
  background: #2a579a;
}

.PSPDFKit-Viewport {
  background: #dfdfdf;
}

</style>

<div use:handlePDF={doc} class="container" />
