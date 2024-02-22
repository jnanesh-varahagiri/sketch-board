
    const canvas1 = document.querySelector("canvas")
    canvas1.width = window.innerWidth
    canvas1.height =window.innerHeight
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
    let tool = canvas1.getContext('2d')
    let penColor = 'red'
    let eraserColor = 'white'
    let penWidth = pencilWidthElem.value
    let eraserWidth = eraserWidthElement.value
    tool.lineWidth = "3"
    
    
    //Initializing colors for line stroke
    eraser.addEventListener('click',(e12)=>{
        if(eraserFlag){
              tool.strokeStyle =eraserColor;
              tool.lineWidth =eraserWidth
        }else{
            tool.strokeStyle =penColor;
            tool.lineWidth =penWidth
    
        }
    })
    pencil.addEventListener('click',(e13)=>{
        if(pencilFlag){
            eraserFlag =false
        }
    })
    
    //adding event listerns for colors
    pencilColor.forEach((colorElem)=>{
        colorElem.addEventListener("click" , (e14)=>{
    
            let color = colorElem.classList[0]
            console.log(color)
            penColor = color;
            // tool.strokeStyle = color
            // tool.lineWidth = penWidth
        })
    })
    
    
    //changing the width of the eraser and pencil
    pencilWidthElem.addEventListener('change' , (e15)=>{
        penWidth = e15.target.value
        // tool.lineWidth = penWidth
    })
    
    eraserWidthElement.addEventListener('change',(e16)=>{
        eraserWidth = e16.target.value
        // tool.lineWidth = eraserWidth
        // tool.strokeStyle='white'
    })
    
    
    //drawing the things
    //MOUSE DOWN -> START NEW PATH ,MOUSE MOVE ->PATH FILL (GRAPHICS)
    canvas1.addEventListener('mousedown',(e17)=>{
        mousedown=true
        beginPath({
            x:e17.clientX,
            y:e17.clientY,
           
        })
       
    
    })
    canvas1.addEventListener("mousemove",(e18)=>{
          if(mousedown){
             drawStroke({
                x:e18.clientX,
                y:e18.clientY,
                color : eraserFlag ? eraserColor : penColor,
                width : eraserFlag ? eraserWidth : penWidth
             })
    
          }
    })
    
    canvas1.addEventListener("mouseup" ,(e19)=>{
        mousedown=false
        let url = canvas1.toDataURL();
        undoRedoTracker.push(url);
        track = undoRedoTracker.length - 1
    })
    
    undo.addEventListener('click',(e111)=>{
        if(track > 0){
            track--;
        }
        let trackObj={
            trackValue :track,
            undoRedoTracker
        }
        undoRedocanvas1(trackObj)
    
    })
    redo.addEventListener('click',(e112)=>{
        if(track < undoRedoTracker.length-1){
            track++
        }
        let trackObj={
            trackValue :track,
            undoRedoTracker
        }
        undoRedocanvas1(trackObj)
        
    })
    
    function undoRedocanvas1(trackObj){
        track = trackObj.trackValue;
        undoRedoTracker = trackObj.undoRedoTracker
    
        let img = new Image();
        img.src = undoRedoTracker[track]
        img.onload = (e)=>{
            tool.drawImage(img,0,0,canvas1.width,canvas1.height)
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
    
    
    download.addEventListener('click',(e113)=>{ 
        let url = canvas1.toDataURL()
    
        let a = document.createElement("a");
        a.href= url;
        a.download = "board.jpg"
        a.click()
    })
    






