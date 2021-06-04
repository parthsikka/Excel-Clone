let cellsContent = document.querySelector(".cells-content") ;
let topRow = document.querySelector(".top-row")  ;
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell") ;
let add = document.querySelector("#address") ;
let eachCell = document.querySelectorAll(".cell") ;
let lastSelectedCell ;
let formulaBox = document.querySelector("#formula");

cellsContent.addEventListener("scroll", function(e){
    topRow.style.top = e.target.scrollTop+"px";
    topLeftCell.style.top = e.target.scrollTop+"px";
    topLeftCell.style.left = e.target.scrollLeft+"px";
    leftCol.style.left = e.target.scrollLeft+"px";
})
let colId;
let rowId ;
cellsContent.addEventListener("click", function(e){
    document.querySelector("#formula").value = "" ;

    rowId = Number(e.target.getAttribute("rowid")) ; 
    colId = Number(e.target.getAttribute("colid")) ; 
    if(db[rowId][colId].formula){
        document.querySelector("#formula").value = db[rowId][colId].formula ;
    }
    let address = String.fromCharCode(65 + colId) + (rowId+1) +"" ;
    add.value = address ;
   // console.log(e.target);
})

// cell blur function : 

for(let a=0 ; a<eachCell.length ; a++){
    eachCell[a].addEventListener("focusout", function(e){
        let currentElement = e.target ; 
       // console.log(currentElement); 
        let cellObject = db[rowId][colId] ;
        let value = currentElement.outerText ;
        lastSelectedCell = currentElement ;
        // update dependency : 
        if(cellObject.value != value){
            // remove formula :
            if(cellObject.formula){
                removeFormula(cellObject) ;
            }
            cellObject.value = value ;
            updateChildrens(cellObject) ;
        }
    })
}

// formulabox pe kaam :
formulaBox.addEventListener("focusout", function(e){
    
    let formulaIn = e.target.value ;
    let cellObject = db[rowId][colId] ;

    // if there's an already existing formula :
    if(cellObject.formula){ 
        removeFormula(cellObject) ;
    }
    let ans = calculate(formulaIn, cellObject) ; 
    cellObject.value = ans ;
    lastSelectedCell.textContent = cellObject.value ;
    cellObject.formula = formulaIn ;   
})


