<script>
  import PSPDFKit from "pspdfkit";
  export let pdf;
  export let errorMsg = "";
  let instance;
  const licenseKey="wwh0n-lV5SBk8FvT1LY2G15EgHqEEdiICSsvZur6ivQ9FpOyMz0Lq9tQyUmnFKKi6wbINNhaBRJOdt9T9zsVQFCNZVfJpfr88GaFajigQMkiyvLmPqess1AwzFUeq3LhQRngItZOBS17b7ZHeWIRJTItmrFBBq4xXZKVMx2IcjHdMFSdm6Gy0i9vdIAg7i0e70U96wHvxJW5QNAcWHGYzPkZ8btKW-h-Zv_uQ3iV2-TJqq58-nLRTn6zFMM1fd1Hh3dq9-tSoHSxSel1huX1j5gPlQNwtBf5l6Iw4Bz94Ty1JhQ9G_thTeAnhQkDu9CcfGnSofLpdMfV7OPKTORF_9kzS9-_C04baxdLHUWJC7eo44iTR1u8VtwxSyGo9zu3Hm3EuoXsOYqs3VpMKPfUq2Obvi6b0l_eFxbvfI7NttgaXP9wxJ7uMSetGn8PMkw5";

  function handlePDF(element) {
    load(element);
    return {
      destroy() {
        unload(element);
      }
    };
  }

  async function load(container) {
    try {
      instance = await PSPDFKit.load({
        container,
        pdf,
        licenseKey
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

<div use:handlePDF class="container" />
