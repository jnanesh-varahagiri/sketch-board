let canvas = document.querySelector('.canvas-cont')
canvas.width = window.innerWidth
canvas.height =window.innerHeight
let mousedown =false;
let pencilColor = document.querySelectorAll(".pencil-color")
let pencilWidthElem = document.querySelector(".pencil-width")
let eraserWidthElement = document.querySelector(".eraser-width")
let download = document.querySelector('.download')
let redo =document.querySelector('.redo')
let undo = document.querySelector('.undo')

let undoRedoTracker =[] //data
let track = 0; // represent



//Api
let tool = canvas.getContext('2d')
let penColor = 'red'
let eraserColor = 'white'
let penWidth = pencilWidthElem.value
let eraserWidth = eraserWidthElement.value
tool.lineWidth = "3"


//Initializing colors for line stroke
eraser.addEventListener('click',(e)=>{
    if(eraserFlag){
          tool.strokeStyle =eraserColor;
          tool.lineWidth =eraserWidth
    }else{
        tool.strokeStyle =penColor;
        tool.lineWidth =penWidth

    }
})
pencil.addEventListener('click',(e)=>{
    if(pencilFlag){
        eraserFlag =false
    }
})

//adding event listerns for colors
pencilColor.forEach((colorElem)=>{
    colorElem.addEventListener("click" , (e)=>{

        let color = colorElem.classList[0]
        console.log(color)
        penColor = color;
        // tool.strokeStyle = color
        // tool.lineWidth = penWidth
    })
})


//changing the width of the eraser and pencil
pencilWidthElem.addEventListener('change' , (e)=>{
    penWidth = e.target.value
    // tool.lineWidth = penWidth
})

eraserWidthElement.addEventListener('change',(e)=>{
    eraserWidth = e.target.value
    // tool.lineWidth = eraserWidth
    // tool.strokeStyle='white'
})


//drawing the things
//MOUSE DOWN -> START NEW PATH ,MOUSE MOVE ->PATH FILL (GRAPHICS)
canvas.addEventListener('mousedown',(e)=>{
    mousedown=true
    beginPath({
        x:e.clientX,
        y:e.clientY,
       
    })
   

})
canvas.addEventListener("mousemove",(e)=>{
      if(mousedown){
         drawStroke({
            x:e.clientX,
            y:e.clientY,
            color : eraserFlag ? eraserColor : penColor,
            width : eraserFlag ? eraserWidth : penWidth
         })

      }
})

canvas.addEventListener("mouseup" ,(e)=>{
    mousedown=false
    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length - 1
})

undo.addEventListener('click',(e)=>{
    if(track > 0){
        track--;
    }
    let trackObj={
        trackValue :track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj)

})
redo.addEventListener('click',(e)=>{
    if(track < undoRedoTracker.length-1){
        track++
    }
    let trackObj={
        trackValue :track,
        undoRedoTracker
    }
    undoRedoCanvas(trackObj)
    
})

function undoRedoCanvas(trackObj){
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker

    let img = new Image();
    img.src = undoRedoTracker[track]
    img.onload = (e)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height)
    }
}

function beginPath(strokeObj){
    tool.beginPath()
    tool.moveTo(strokeObj.x,strokeObj.y)
}

function drawStroke(strokeObj){
    tool.strokeStyle = strokeObj.color,
    tool.lineWidth = strokeObj.width
    tool.lineTo(strokeObj.x,strokeObj.y)
    tool.stroke()
}


download.addEventListener('click',(e)=>{ 
    let url = canvas.toDataURL()

    let a = document.createElement("a");
    a.href= url;
    a.download = "board.jpg"
    a.click()
})


