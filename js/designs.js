// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()


const createCanvas = $('#create-canvas');
const container = $('.canvas-container');
const initiateCanvasForm = $('.initate-canvas-form')
const pixel = '.cell';
const colorPicker = $('#colorPicker');
const swatchColor = '.swatchColor';
const swatches = $('.swatches');
const reset = $('#reset');
const clear = $('#clear');
const infoLog = $('#infoLog');
const inputValue = $('input');
const canvasGrid = $('#pixel-canvas');

let selectedColor = "#000000";

$(function() {

  //CREATE CANVAS
  createCanvas.on('click', function makeGrid(canvas, canvasWidth, canvasHeight) {
    canvasWidth = $('#input-width').val();
    canvasHeight = $('#input-height').val();
    //Canvas Constructor Loop
    canvas = '<table id="pixel-canvas">';
    for (let row = 0; row < canvasHeight; row++) {
      canvas += '<tr>';
      for (let col = 0; col < canvasWidth; col++) {
        canvas += '<td><div class="cell" col="' + (col + 1) + '" row="' + (row + 1) + '"></div></td>';
      }
      canvas += '</tr>';
    }
    canvas += '</table>';
    container.append(canvas);
    initiateCanvasForm.hide(200);
    infoLog(canvasWidth, canvasHeight);
  });
  // INPUT MIN/MAX VALUE to control the size
  inputValue.on('input', function minMaxValue(minValue, maxValue) {
    minValue = parseInt($(this).attr('min'));
    maxValue = parseInt($(this).attr('max'));
    if ( $(this).val() > maxValue) {
      $(this).val(maxValue);
    }
    if ( $(this).val() < minValue) {
      $(this).val(minValue);
    }
  });






  // inputValue.on('input', function maxValue(maxValue) {
  //   maxValue = parseInt($(this).attr('max'));
  //   if ( $(this).val() > maxValue) {
  //     $(this).val(maxValue);
  //   }
  // });
  // inputValue.on('input', function minValue(minValue) {
  //   minValue = parseInt($(this).attr('min'));
  //   if ( $(this).val() < minValue) {
  //     $(this).val(minValue);
  //   }
  // });

  // SWATCHES PALETTE CREATOR
  swatches.each(function(color,index) { // index tu console.log wyswietla DOM w consolii ot ciekawostka.
    color = ['#4E41CC', '#8B008B', '#FF1493', '#FF412A', '#F4A460', '#FFFE51', '#ADFF2F', '#00BFFF']; // '#00BFFF', '#4E41CC',
    let palette = '';
    for (let i = 0; i < color.length; i++) {
      palette += '<div class="swatchColor" title="swatch: ' + color[i] + '" data-color="' + color[i] + '" style="background-color: ' + color[i] + ';"></div>';
      // console.log(index);
    }
    $(this).append(palette);
  });

  // PICH A SWATCH FROM PALETTE Function
  function pickSwatch(swatchColor, selectedColor) {
    selectedColor = $(swatchColor).attr('data-color');
    console.log("hex : " + selectedColor);
    colorPicker.val(selectedColor);
  }
  swatches.on('click', swatchColor, function() {
    pickSwatch(this);
  });

  colorPicker.val(selectedColor);



  // DRAW PIXEL
  function drawPixel(pixel, color) {
    color = colorPicker.val();
    $(pixel).attr('style', 'background-color: ' + color + ';');
  }
  function ereasePixel(pixel) {
    $(pixel).removeAttr('style');
  }
  container.on('mousedown', pixel, function(event) {
    event.preventDefault();
    drawPixel(this);
    if (event.buttons == 2) {
      ereasePixel(this);
    }
  });
  container.on('mouseover', pixel, function(event) {
    if (event.buttons == 1) {
      drawPixel(this);
    } else if (event.buttons == 2) {
      ereasePixel(this);
      //container.css
    }
  });
  // canvasGrid.on('dragstart', function(event) {
  //   event.preventDefault();
  // });

  // ACTIONS PANEL
  function clearCanvas() {
    $(pixel).removeAttr('style');
  }
  function resetCanvas() {
    $('table').remove();
    initiateCanvasForm.show(200);
  }
  clear.on('click', function() {
    clearCanvas();
  });
  reset.on('click', function() {
    resetCanvas();
  });

  //INFO LOG - Intresting facts about the canvas
  function infoLog(canvasWidth, canvasHeight) {
    let amount = canvasWidth * canvasHeight;
    $('#dimesion').text("GRID SIZE");
    $('#cell-x').text("W : " + canvasWidth + " px");
    $('#cell-y').text("H : " + canvasHeight + " px");
    $('#amount').text("(" + amount + " px)");
    $('#position').text("POSITION");
  }
  container.on('mouseover', pixel, function positionLog(posx, posy) { //
    posx = $(this).attr('col');
    posy = $(this).attr('row');
    $('#pos-x').text("X : " + posx + " px");
    $('#pos-y').text("Y : " + posy + " px");
  });
});
document.addEventListener("dragstart", function(event) {
    event.preventDefault();
});









// function infoLog(canvasWidth, canvasHeight) {
//   let amount = canvasWidth * canvasHeight;
//   let mpix = amount/10000;
//   $('#dimesion').text("DIMESION");
//   $('#cell-x').text("W : " + canvasWidth + " px");
//   $('#cell-y').text("H : " + canvasHeight + " px");
//   $('#matrix').text("MATRIX");
//   $('#size').text(mpix.toFixed(2) + " Mpix");
//   $('#amount').text("(" + amount + " px)");
//   $('#position').text("POSITION");
// }
