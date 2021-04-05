const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const block = document.querySelector('.fillBlock');

canvas.width = 600;
canvas.height = 300;

let click = {
    layerX: 0,
    layerY: 0
};

const square = () => {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(30, 70, 160, 160);
}

const circle = () => {
    ctx.fillStyle = 'red';
    ctx.arc(300, 150, 80, 0, Math.PI * 2);
    ctx.fill();
}

const triangle = () => {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(490, 70);
    ctx.lineTo(410, 230);
    ctx.lineTo(570, 230);
    ctx.closePath();
    ctx.fill();
}

canvas.addEventListener('mousedown', (e) => {
    click.layerX = e.layerX;
    click.layerY = e.layerY;

    const img_data = ctx.getImageData(click.layerX, click.layerY, 1, 1);
    const rgba = img_data.data;
    block.style.backgroundColor = `rgba(${rgba.join(',')})`;
});

square();
circle();
triangle();