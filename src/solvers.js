/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var conflict = function(arr) {
  var nonzero = {};
  for (var i; i < arr.length; i++) {
    if (arr[i] !== 0) {
      if (nonzero[arr[i]] === undefined) {
        nonzero[arr[i]] = arr[i];
      } else {
        return true;
      }
    }
  }
  
  return false;
}

window.findNRooksSolution = function(n) {
  var solved = false;
  var solution;
  var row = 0;
  var prevCol = [];

  var start = new Board({'n':n});

  var subroutine  = function(board) {

    if (row === n && !solution) {
      solution = new Board(board.rows());
      solved = true;
      return;
    } else {
      for (var col = 0; col < n; col++) {
        if (prevCol.indexOf(col) === -1) {
          if (!solved) {
            board.togglePiece(row, col);
            prevCol.push(col);
          }
          
          if (!board.hasAnyRooksConflicts() && !solved) {
            row++;
            subroutine(board);
            // remove piece
            row--;
            if (row !== n && !solved) {
              board.togglePiece(row, col);
              prevCol.pop(col);
            }
          } else if (!solved){
            //remove piece
            board.togglePiece(row, col);
            prevCol.pop(col);
          }
        }
      }
    }
  
  };
  subroutine(start);
  if (solution === undefined) {
    solution = new Board({'n': n});
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var row = 0;
  var prevCol = {};

  var start = [];
  for (var i = 0; i < n; i++) {
    start[i] = 0;
  }

  var subroutine  = function(board) {
    if (row === n) {
      solutionCount++;
    } else {
      for (var col = 0; col < n; col++) {
        // add piece
        if (prevCol[col] === undefined) {
          start[row] = col;
          prevCol[col] = col;

          if (!conflict(board)) {
            row++;
            subroutine(board);
            // remove piece
            row--;
            if (row !== n) {
              start[row] = 0;
              delete prevCol[col];
            }
          } else {
            //remove piece
            start[row] = 0;
            delete prevCol[col];
          }
        }
      }
    }
  
  };

  subroutine(start);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solved = false;
  var solution;
  var row = 0;
  var prevCol = [];

  var start = new Board({'n':n});

  var subroutine = function(board) {

    if (row === n && !solution) {
      solution = new Board(board.rows());
      solved = true;
      return;
    } else {
      for (var col = 0; col < n; col++) {
        if (prevCol.indexOf(col) === -1) {
          if (!solved) {
            board.togglePiece(row, col);
            prevCol.push(col);
          }
          
          if (!board.hasAnyQueensConflicts() && !solved) {
            row++;
            subroutine(board);
            // remove piece
            row--;
            if (row !== n && !solved) {
              board.togglePiece(row, col);
              prevCol.pop(col);
            }
          } else if (!solved){
            //remove piece
            board.togglePiece(row, col);
            prevCol.pop(col);
          }
        }
      }
    }
  
  };
  subroutine(start);
  if (solution === undefined) {
    solution = new Board({'n': n});
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;
  var row = 0;
  var prevCol = [];

  var start = new Board({'n':n});

  var subroutine  = function(board) {
    if (row === n) {
      solutionCount++;
    } else {
      for (var col = 0; col < n; col++) {
        // add piece
        if (prevCol.indexOf(col) === -1) {
          board.togglePiece(row, col);
          prevCol.push(col);

          if (!board.hasAnyQueensConflicts()) {
            row++;
            subroutine(board);
            // remove piece
            row--;
            if (row !== n) {
              board.togglePiece(row, col);
              prevCol.pop(col);
            }
          } else {
            //remove piece
            board.togglePiece(row, col);
            prevCol.pop(col);
          }
        }
      }
    }
  
  };
  subroutine(start);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
