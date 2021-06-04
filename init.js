let cells = document.querySelector(".cells-content") ;
// initialize the cells and then append it in the body :
(function(){
let body = "" ;

// top left cell : 
body+= `<div class = "top-left-cell"></div>` ;

// top row : 
body+= `<div class = "top-row">`;
for(let i=0 ; i<26 ; i++){
    body+= `<div class = "top-row-cell">${String.fromCharCode(65+i)}</div>` ;
}
body+= `</div>` ;
// left col : 
body+= `<div class = "left-col">`;
for(let i=1 ; i<101 ; i++){
    body+= `<div class = "left-col-cell">${i}</div>` ;
}
body+= `</div>` ;


body+= `<div class = "cells">` ;
for(let a=0 ; a<100 ; a++){
    body+= `<div class="row">`;
    for(let b=0 ; b<26 ; b++){
        body+= `<div contentEditable="true" rowid="${a}" colid="${b}" class="cell"></div>` ;
    }
    body+= `</div>` ;
}
body+= `</div>` ;

cells.innerHTML += body ; 
})() ;

// Initialising the DataBase : 
let db = [] ;
(function(){
for(let i=0 ; i<100 ; i++){
    let row = [] ;
    for(let j=0 ; j<26 ; j++){
        let address = String.fromCharCode(65 + j) + (i+1) +"" ;
        let cellObject ={
            name : address, 
            value : "" ,
            formula : "" ,
            childrens : [],
            parents: [],
        }
        row.push(cellObject) ;
    }
    db.push(row) ;
}
})();

//console.log(db);