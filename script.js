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
    rowId = Number(e.target.getAttribute("rowid")) ; 
    colId = Number(e.target.getAttribute("colid")) ; 
    let address = String.fromCharCode(65 + colId) + rowId +"" ;
    add.value = address ;
   // console.log(e.target);
})

// cell blur function : 

for(let a=0 ; a<eachCell.length ; a++){
    eachCell[a].addEventListener("focusout", function(e){
        let currentElement = e.target ; 
       // console.log(currentElement); 
        let cellObject = db[rowId-1][colId] ;
        cellObject.value = currentElement.outerText ;
        lastSelectedCell = currentElement ;
    })
}

// formulabox pe kaam :
formulaBox.addEventListener("focusout", function(e){
    let formulaIn = e.target.value ;
    let ans = calculate(formulaIn) ; 
    let cellObject = db[rowId-1][colId] ;
    cellObject.value = ans ;
   lastSelectedCell.textContent = ans ;
    cellObject.formula = formulaIn ;   
})