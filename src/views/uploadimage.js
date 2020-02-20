$(() => {
  $('#imgupload').change((e) => {
    // canvas
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext("2d");
    // context.canvas.width = window.innerWidth;
    // context.canvas.height = window.innerHeight;
    let img = new Image();
    let files = e.target.files; // FileList object
    let file = files[0];
    if (file.type.match('image.*')) {
      let reader = new FileReader();
      // Read in the image file as a data URL.
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
          context.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,     // source rectangle
            0,
            0,
            canvas.width,
            canvas.height
          ); // destination rectangle
        }
      }
    }
  })
})