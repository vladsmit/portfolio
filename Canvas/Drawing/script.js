const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const selectColor = document.getElementById('fillColor');
const selectLineWidth = document.getElementById('lineWidth');
const lineWidthValue = document.querySelector('.lineWidthValue');
const clearButton = document.querySelector('.button[data-name="clear"]');
const saveButton = document.querySelector('.button[data-name="save"]');
const deleteButton = document.querySelector('.button[data-name="delete"]');
const repeatButton = document.querySelector('.button[data-name="repeat"]');

let isMouseDown = false;
let coords = [];

canvas.width = 600;
canvas.height = 600;

lineWidthValue.innerText = selectLineWidth.value;

const repeatDrawing = () => {
    if (!localStorage.coords) {
        console.log('There is nothing to draw...');
        return;
    }
    coords = JSON.parse(localStorage.getItem('coords'));
    clearLayer();
    replayDrawing(coords);
}

const saveDrawing = () => {
    console.log('Saved');
    localStorage.setItem('coords', JSON.stringify(coords));
}

const clearLayer = () => {
    console.log('Cleared');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = selectColor.value;
}

const replayDrawing = (coords) => {
    console.log('Replaying');
    let timer = setInterval(() => {
        if (!coords.length) {
            clearInterval(timer);
            ctx.beginPath();
            return;
        }
        let x = coords[0][0];
        let y = coords[0][1];
        drawingLine(x, y);
        coords.shift();
    }, 40);
}

const deleteDrawing = () => {
    console.log('Deleted');
    coords = [];
    localStorage.removeItem('coords');
}

const drawingLine = (x, y) => {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.arc(x, y, selectLineWidth.value, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

clearButton.addEventListener('click', clearLayer);
saveButton.addEventListener('click', saveDrawing);
deleteButton.addEventListener('click', deleteDrawing);
repeatButton.addEventListener('click', repeatDrawing);

lineWidth.addEventListener('input', () => {
    lineWidthValue.innerText = selectLineWidth.value;
})

canvas.addEventListener('mousedown', () => {
    isMouseDown = true;
})

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
    coords.push('mouseup');
    ctx.beginPath();
})

canvas.addEventListener('mousemove', (e) => {
    ctx.fillStyle = selectColor.value;
    ctx.strokeStyle = selectColor.value;
    ctx.lineWidth = 2 * selectLineWidth.value;
    if (isMouseDown) {
        let x = e.layerX;
        let y = e.layerY;
        coords.push([x, y]);
        drawingLine(x, y);
    }
})