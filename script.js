let cellsContent = document.querySelector(".cells-content") ;
let topRow = document.querySelector(".top-row")  ;
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell") ;


cellsContent.addEventListener("scroll", function(e){
    topRow.style.top = e.target.scrollTop+"px";
    topLeftCell.style.top = e.target.scrollTop+"px";
    topLeftCell.style.left = e.target.scrollLeft+"px";
    leftCol.style.left = e.target.scrollLeft+"px";
    console.log(e.target.scrollTop, e.target.scrollLeft);
})