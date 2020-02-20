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
  let interesting = []


  $('#interesting').on('click', function () {
    $('#uninteresting').removeClass('uninteresting');
    $(this).addClass('interesting');
    interesting.push("Interesting")
  });
  $('#uninteresting').on('click', function () {
    $('#interesting').removeClass('interesting');
    $(this).addClass('uninteresting');
    interesting.push("Uninteresting")
  });

  function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
  }

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

    // context.beginPath();
    // context.rect(startX, startY, width, height);
    // context.fillStyle = "yellow";
    // context.canvas.addEventListener('click', function(e) {
    //     let mouseX = e.clientX - context.canvas.offsetLeft
    //     let mouseY = e.clientY - context.canvas.offsetTop

    //     context.fillStyle = "orange"
    //     context.globalAlpha = 0.2;
    //     context.fillRect(mouseX, mouseY, 30,30)
    // })

    context.fillRect(startX, startY, width, height);
    context.fillStyle = "orange"




    // context.globalAlpha = 1.0;
    // context.lineWidth = 1;
    // context.strokeStyle = 'black';
    // context.stroke();

    if (mouseIsDown === 0) {
      let upperLeft = { pointId: generateUID(), position: [startX, startY] }
      let lowerRight = { pointId: generateUID(), position: [endX, endY] }
      let annotation = { annotationID: generateUID(), upperLeft, lowerRight, type: interesting[0] }
      squares.push(annotation)
      interesting = [];
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

    $.ajax({
      url: '/submit',
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        console.log(data)
      },
      data: JSON.stringify({ imageName: imageName, annotations: annotations })
    });


  });
})