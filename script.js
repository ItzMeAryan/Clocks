document.getElementById('analog-btn').addEventListener('click', function() {
    showAnalogClock();
});

document.getElementById('digital-btn').addEventListener('click', function() {
    showDigitalClock();
});

function showAnalogClock() {
    const clockContainer = document.getElementById('clock-container');
    clockContainer.innerHTML = ''; // Clear previous clock

    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 320;
    clockContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    setInterval(drawAnalogClock, 1000, ctx, canvas.width, canvas.height);
}

function drawAnalogClock(ctx, width, height) {
    const now = new Date();
    const radius = width / 2;
    ctx.clearRect(0, 0, width, height);
    ctx.translate(radius, radius);

    // Draw clock face
    ctx.beginPath();
    ctx.arc(0, 0, radius - 10, 0, 2 * Math.PI);
    ctx.strokeStyle = '#b0c4de';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Draw hour hand
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const hourAngle = (hour + minute / 60) * (2 * Math.PI) / 12;
    drawHand(ctx, hourAngle, radius * 0.5, 7, '#f08080');

    // Draw minute hand
    const minuteAngle = (minute + second / 60) * (2 * Math.PI) / 60;
    drawHand(ctx, minuteAngle, radius * 0.75, 5, '#b0c4de');

    // Draw second hand
    const secondAngle = (second) * (2 * Math.PI) / 60;
    drawHand(ctx, secondAngle, radius * 0.85, 2, '#f08080');

    ctx.resetTransform();
}

function drawHand(ctx, angle, length, width, color) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-angle);
}

function showDigitalClock() {
    const clockContainer = document.getElementById('clock-container');
    clockContainer.innerHTML = ''; // Clear previous clock

    const timeDisplay = document.createElement('div');
    timeDisplay.id = 'time-display';
    clockContainer.appendChild(timeDisplay);
    
    setInterval(updateDigitalClock, 1000);
}

function updateDigitalClock() {
    const timeDisplay = document.getElementById('time-display');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}
