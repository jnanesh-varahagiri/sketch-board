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
optionsCount.addEventListener("click", (e) => {
  console.log(e);
  console.log(optionsCount.children);
  optionsFlag = !optionsFlag;
  if (optionsFlag) {
    openTools();
  } else {
    closeTools();
  }
});

pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencilToolCont.style.display = "block";
  } else {
    pencilToolCont.style.display = "none";
  }
});

eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;
  if (eraserFlag) {
    eraserToolCont.style.display = "flex";
  } else {
    eraserToolCont.style.display = "none";
  }
});

upload.addEventListener("click",(e)=>{
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click()
    input.addEventListener('change' , (e)=>{
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

stickyToolCont.addEventListener("click", (e) => {
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
    minimize.addEventListener('click',(e)=>{
        console.log(e)
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
    removal.addEventListener("click" , (e)=>{
        console.log(e)
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
    removal.addEventListener("click",(e)=>{
        console.log(removal)
        removal.remove()
    })
    minimize.addEventListener("click",(e)=>{
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
