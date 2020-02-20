$(() => {
  $(() => {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseXY, false);
    canvas.addEventListener("mouseup", mouseUp, false);
  })

  let canvas, context, startX, endX, startY, endY;
  let mouseIsDown = 0;
  let squares = [];
  let annotations = squares;


  function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.pageX - rect.left,
      y: evt.pageY - rect.top
    };
  }

  function drawSquare() {
    // creating a square
    let width = Math.abs(startX - endX);
    let height = Math.abs(startY - endY);
    context.clearRect(0, 0, context.width, context.height);
    //or use fillRect if you use a bg color

    context.beginPath();
    context.rect(startX, startY, width, height);
    context.fillStyle = "yellow";
    context.fill();
    // context.fillStyle = "rgba(255, 255, 255, 0.5)";
    // context.globalCompositeOperation = "lighter";
    context.lineWidth = 7;
    context.strokeStyle = 'black';
    context.stroke();

    if (mouseIsDown === 0) {
      let upperLeft = { pointonId: '1', position: [startX, startY] }
      let lowerRight = { pointId: '1', position: [endX, endY] }
      let annotation = { annotationID: '1', upperLeft, lowerRight, type: 'ineristing' }
      squares.push(annotation)
    }
  }

  function mouseUp(eve) {
    if (mouseIsDown !== 0) {
      mouseIsDown = 0;
      let pos = getMousePos(canvas, eve);
      endX = pos.x;
      endY = pos.y;
      drawSquare(); //update on mouse-up
    }
  }

  function mouseDown(eve) {
    mouseIsDown = 1;
    let pos = getMousePos(canvas, eve);
    startX = endX = pos.x;
    startY = endY = pos.y;
    drawSquare(); //update
  }

  function mouseXY(eve) {
    if (mouseIsDown !== 0) {
      let pos = getMousePos(canvas, eve);
      endX = pos.x;
      endY = pos.y;
      drawSquare();
    }
  }




  $('#JSONOutput').click(() => {
    let imageElement = document.getElementById('imgupload');
    let imageName = imageElement.value.replace(/.*[\/\\]/, '')
    
    $.post("/submit",
      {
        lable: "submit",
        content: { imageName, annotations }
      },
      function (data, status) {
        result.value = status + ":" + data;
        console.log(data)
      })
  });
})