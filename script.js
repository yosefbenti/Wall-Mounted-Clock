const canvas = document.getElementById("myCanvas")
canvas.style.border = "2px solid red"
const output = document.getElementById("output")
const ctx = canvas.getContext("2d")

canvas.width = 400;
canvas.height = 400;
let gap = canvas.width/4;
let radius = canvas.width / 2;


// functions 
// fucntion to drawthe hole clock
function drawClock()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(gap)
    drawClockBody(ctx,radius)
    drawClockCenter(ctx,radius)
    drawNumbersHours(ctx,radius)
    drawNumbersSecond(ctx,radius)
    dateTime(ctx,radius)
    
    
}
 // function to draw the clock circle body
function drawClockBody(ctx,radius)
{
    
      ctx.save()
      ctx.beginPath()
      ctx.arc(radius,radius,radius - 10,Math.PI * 0,Math.PI * 2)
      ctx.strokeStyle = "red"
      ctx.stroke()
      ctx.closePath()
      ctx.restore()

}

function drawClockCenter(ctx,radius)
{
    
    ctx.save();
    const grad = ctx.createRadialGradient(radius, radius, 1, radius, radius, radius - 20);
    grad.addColorStop(0, "#333");
    grad.addColorStop(0.5, "blue");
    grad.addColorStop(1, "#333");


    const now = new Date()
    const houres = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now .getSeconds()
    ctx.beginPath();
    ctx.arc(radius, radius, radius - 30, Math.PI * 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(radius, radius, 10, Math.PI * 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath()
    ctx.font = "30px Arial";
    ctx.fillText(` ${houres} : ${minutes} : ${seconds}`,radius,radius+50);
    ctx.closePath()
    ctx.restore()
    
}
function drawNumbersSecond(ctx,radius)
{
    
   
    ctx.font = radius * 0.04 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for (let i = 1; i <= 60; i++) {
        let ang = (Math.PI / 30) * i;
        ctx.save();
        ctx.beginPath();
        ctx.rotate(ang);
        ctx.translate(0, -radius + radius/4 );
        ctx.rotate(-ang);

        ctx.fillText(`${i}`, radius, radius);
        ctx.restore();
        ctx.closePath();
    }
   
  
}

function drawNumbersHours(ctx,radius)
{
    
   
    ctx.font = radius * 0.06 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for (let i = 1; i <= 12; i++) {
        let ang = (Math.PI / 6) * i;
        ctx.save();
        ctx.beginPath();
        ctx.rotate(ang);
        ctx.translate(0, -radius + radius/3);
        ctx.rotate(-ang);

        ctx.fillText(`${i}`, radius, radius);
        ctx.restore();
        ctx.closePath();
    }
   
  
}

function dateTime(ctx,radius)
{

    const yahunseat = new Date();

    let hour = yahunseat.getHours();
    let minute = yahunseat.getMinutes();
    let second = yahunseat.getSeconds();

    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHandle(ctx, hour, (radius - radius/4) * 0.5, radius * 0.07);

    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHandle(ctx, minute, (radius - radius/4) * 0.8, radius * 0.07);

    second = (second * Math.PI/30);
    drawHandle(ctx, second, (radius - radius/4) * 0.9, radius * 0.02);

    

}

function drawHandle(ctx,pos,length,width)
{
    ctx.save(); // Save the current state
    ctx.beginPath();
    ctx.lineWidth = width; // Set the line width
    ctx.lineCap = "round"; // Rounded ends for the handle
    ctx.translate(radius, radius); // Move the context to the center of the clock
    ctx.rotate(pos); // Rotate to the position for the hand
    ctx.moveTo(0, 0); // Start at the center
    ctx.lineTo(0, -length); // Draw the line upwards based on length
    ctx.stroke(); // Render the line
    ctx.restore(); // Restore to the previous state

}

function drawGrid(gap){

    ctx.beginPath()
    for(let x = gap; x<canvas.width;x=x+gap)
    {
        ctx.moveTo(x,0)
        ctx.lineTo(x , canvas.width)
        
    }
    for(let y = gap; y<canvas.height;y=y+gap)
        {
            ctx.moveTo(0,y)
            ctx.lineTo(canvas.height , y)
        }
        ctx.stroke()
        ctx.closePath()
}
setInterval(drawClock,1000);










