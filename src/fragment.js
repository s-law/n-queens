var subroutine  = function(array) {

  //BASE CASE
    if(steps === n){
      solutionCount++;
      steps = 0;
    }
  //RECURSIVE CASE
    
    var flatArray = [];
    var newBoardArr = [];
    var boardSlice = [];

    for (var i = 0; i < n; i++) {
      flatArray = flatArray.concat(array[i]);
    }

    var failSafeArr = flatArray.slice();
    // take in array of arrays [0, 1, 0.... ,0,0,1]
    //  
    //for loop across row "step"
    steps++;
    for (var i = 0; i<n*n; i++) {
      if (failSafeArr[i] === 0) {
        failSafeArr[i] = 1;
  
        for (var j = 0; j < n; j++) {
          boardSlice = failSafeArr.slice(0,n);
          newBoardArr.push(boardSlice);
          failSafeArr = failSafeArr(n, failSafeArr.length);
        }

        //copy input var to new var
        var newBoard = new Board (newBoardArr);
        
        //if no conflict
        if(!newBoard.hasAnyRooksConflicts()){
          //call subroutine on new var
          subroutine(newBoardArr);
        } else {
          steps--;
        }
      }
    }
  };