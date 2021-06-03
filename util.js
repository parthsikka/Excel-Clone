function calculate(formula){
    let comps = formula.split(" ") ;
    for(let a=0; a<comps.length ; a++){
        //"[", "A1", "+", "B1", "]"
        let c = comps[a]; 
        if(c[0]>="A" && c[0]<="Z"){
            let {rowid, colid} = convertToCoordinates(c) ;
            console.log(rowid, colid);
            let cellObject = db[rowid][colid] ; 
            let value = cellObject.value ;
            formula = formula.replace(c, value) ;
        }
    }
    console.log(formula);
    let ans = eval(formula) ;
    return ans ; 
}

function convertToCoordinates(ch){
    // B1 -> {1,1}
    colid = ch.charCodeAt(0) - 65 ;
    rowid = Number(ch.substring(1)) - 1 ;
    return {rowid,colid} ;
}