let toolsCont = document.querySelector(".tools-cont");
let optionsCount = document.querySelector(".options-cont");
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let stickyToolCont = document.querySelector(".stickynote");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let upload = document.querySelector('.upload')

let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;
let sticky = false;
resetTools();

//true ->tools show , false --> hide tools
optionsCount.addEventListener("click", (e1) => {
  console.log(e1);
  console.log(optionsCount.children);
  optionsFlag = !optionsFlag;
  if (optionsFlag) {
    openTools();
  } else {
    closeTools();
  }
});

pencil.addEventListener("click", (e2) => {
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencilToolCont.style.display = "block";
  } else {
    pencilToolCont.style.display = "none";
  }
});

eraser.addEventListener("click", (e3) => {
  eraserFlag = !eraserFlag;
  if (eraserFlag) {
    eraserToolCont.style.display = "flex";
  } else {
    eraserToolCont.style.display = "none";
  }
});

upload.addEventListener("click",(e4)=>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click()
    input.addEventListener('change' , (e5)=>{
      const file=input.files[0]
      if(file){
          let reader = new FileReader();
          reader.onloadend = function() {
            
           innerHTML = `
              <div class="header-cont">
                       <div class="drag">
                       <i class="fa-solid fa-up-down-left-right fa-beat fa-lg" style="color: #FFD43B;"></i>
                       </div>
                       <div class="options">
                       <div class="minimize"><i class="fa-solid fa-minimize fa-shake fa-l" style="color: #FFD43B;"></i></div>
                      <div class="removal"><i class="fa-solid fa-xmark fa-flip fa-xl" style="color: #FFD43B;"></i></div>
                       </div>
                      
                  </div>
                  <div class="note-cont">
                      <img  src=${reader.result} alt="dfjjdDfsdf"> 

                  </div> 
                  `;
            createSticky(innerHTML)
              
          }
          reader.readAsDataURL(file);
    
        
      }
    })

})

stickyToolCont.addEventListener("click", (e6) => {
  let template = `
  <div class="header-cont">
           <div class="drag">
           <i class="fa-solid fa-up-down-left-right fa-beat fa-lg" style="color: #FFD43B;"></i>
           </div>
           <div class="options">
           <div class="minimize"><i class="fa-solid fa-minimize fa-shake fa-l" style="color: #FFD43B;"></i></div>
          <div class="removal"><i class="fa-solid fa-xmark fa-flip fa-xl" style="color: #FFD43B;"></i></div>
           </div>
          
      </div>
      <div class="note-cont">
            <textarea></textarea>

      </div> 

      `

      createSticky(template)
  
});

// function 
function createSticky(stickyTempateHtml){
  let stickyContainer = document.createElement("div");
  stickyContainer.setAttribute("class", "sticky-cont");
  stickyContainer.innerHTML = stickyTempateHtml;
    let minimize = stickyContainer.querySelector('.minimize')
    let removal = stickyContainer.querySelector('.removal')
    stickyContainer.addEventListener("click" ,(e)=>{
        console.log(e)
    })

    // adding event listners
    minimize.addEventListener('click',(e7)=>{
        console.log(e7)
        let noteContainer = stickyContainer.querySelector(".note-cont")
        console.log(noteContainer)
        let display = getComputedStyle(noteContainer).getPropertyValue("display")
        console.log(display)
        if(display==="none") {
            noteContainer.style.display = "block"
        }else{
            noteContainer.style.display = "none"
            // noteContainer.style.box = "none" //  stickyContainer.querySelector("note-cont").style.display 

        }
    })
    removal.addEventListener("click" , (e8)=>{
        console.log(e8)
        stickyContainer.remove()
    })

    const drag= stickyContainer.querySelector('.drag')
    drag.onmousedown = function(event) {
        dragAndDrop(stickyContainer,event)
        
    }
    
    drag.ondragstart = function() {
         return false;
    };
      
    document.body.appendChild(stickyContainer)
       

}

function openTools() {
  let iconElem = optionsCount.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "flex";
}

function closeTools() {
  let iconElem = optionsCount.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

function resetTools() {
  optionsFlag = false;
  pencilFlag = false;
  eraserFlag = false;
  toolsCont.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}


function noteActions(minimize,removal,stickyContainer){
    removal.addEventListener("click",(e9)=>{
        console.log(removal)
        removal.remove()
    })
    minimize.addEventListener("click",(e11)=>{
        let noteContainer = stickyContainer.querySelector(".note-cont")
        let display =getComputedStyle(noteContainer).getPropertyValue("display")
        if(display==="none") noteContainer.style.display = "block"
        else noteContainer.style.display = "none"

    })

}

function dragAndDrop(element,event){
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    document.body.append(element);
  
    moveAt(event.pageX, event.pageY);
  
    // moves the element at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      element.style.left = pageX - shiftX + 'px';
      element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the element on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the element, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
  
   
}








//canvas.js

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

