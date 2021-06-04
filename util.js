function calculate(formula, selectedCellObject){
    let comps = formula.split(" ") ;
    for(let a=0; a<comps.length ; a++){
        //"[", "A1", "+", "B1", "]"
        let c = comps[a]; 
        if(c[0]>="A" && c[0]<="Z"){
            let {rowid, colid} = convertToCoordinates(c) ;
           // console.log(rowid, colid);
            let cellObject = db[rowid][colid] ; 
            let value = cellObject.value ;
            if(selectedCellObject){
            cellObject.childrens.push(selectedCellObject.name) ;
            selectedCellObject.parents.push(c) ;
            }
            formula = formula.replace(c, value) ;
        }
    }
    
    let ans = eval(formula) ;
    return ans ; 
}

function convertToCoordinates(ch){
    // B1 -> {1,1}
    colid = ch.charCodeAt(0) - 65 ;
    rowid = Math.abs(Number(ch.substring(1))-1) ;
    return {rowid,colid} ;
}

function updateChildrens(cellObject){
    
    for(let a=0 ; a<cellObject.childrens.length ; a++){
        let currentCell = cellObject.childrens[a] ;
       
        let {rowid,colid} = convertToCoordinates(currentCell) ;
        
        let currentCellObject = db[rowid][colid] ;
        let Formula = currentCellObject.formula ;
        let ans = calculate(Formula) ;
        // Update DB : 
        currentCellObject.value = ans ;
        // Update UI : 
        document.querySelector(`.cell[rowid="${rowid}"][colid="${colid}"]`).textContent = ans ;
        
        updateChildrens(currentCellObject) ;
} 
}

function removeFormula(cellObject){
    cellObject.formula="" ;
    for(let b=0 ; b<cellObject.parents.length ; b++){
        // A1, A2
        let {rowid, colid} = convertToCoordinates(cellObject.parents[b]) ;
        let fatherCell = db[rowid][colid] ;
        for(let i=0 ; i<fatherCell.childrens.length ; i++){
            if(fatherCell.childrens[i]==(cellObject.name)){
                fatherCell.childrens.splice(i,1) ;
            }
        }
    }

    cellObject.parents = [] ;
}