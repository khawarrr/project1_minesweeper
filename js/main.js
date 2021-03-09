

/*----- constants -----*/

const icon = {
    
    flag: "url('http://gph.is/1ODUtJB)'",
    bomb: "url('http://gph.is/2vzX29Y')",
}


 /*----- app's state (variables) -----*/

 let flags, winner;

 let board = [];
 let bombCount = 30;
 
 let width = 10;
 



  /*----- cached element references -----*/

  const gridEl = document.querySelector('.grid')



  /*----- event listeners -----*/




/*----- functions -----*/
init();

function init(){
   // random bomb placements
   const bombFiller = Array(bombCount).fill('has_bomb'); // an array that will fill the grid cells with bombs
   const emptyBoard = Array(100 - bombCount).fill('no_bomb'); // an array that doesn't have any bombs in it

   // now we need to combine those two arrays above. There is a method called concat that joins two arrays together 

   const gridCells = emptyBoard.concat(bombFiller);

   // creating a mix array filled with both values

   const mixArray = gridCells.sort(() => Math.random() -0.5);
   



   for (let i = 0; i < 100; i++) {
       //we want 100 sqaures divs
    const cell = document.createElement('div');
    cell.setAttribute('id', i); // this will give the square a unique id
    cell.classList.add(mixArray[i]) // we will also give it a class name so that way squares with bomb and without bombs can be differentiate
    gridEl.appendChild(cell); // 100 divs will be put into .grid class
    board.push(cell);


    // when click on a cell and it doesn't have a bomb
    cell.addEventListener('click', function(e) {
        handleClick(cell)
    })


}

   


    winner = null;
    render();
}

function render() {





    cellNumbers()


}


/*
    [
        00,1,2,3,4,5,6,7,8,09,
        10,*,*,*,*,*,*,*,*,19,
        20,*,*,*,*,*,*,*,*,29,
        30,*,*,*,*,*,*,*,*,39,
        40,*,*,*,*,*,*,*,*,49,
        50,*,*,*,*,*,*,*,*,59,
        60,*,*,*,*,*,*,*,*,69,
        70,*,*,*,*,*,*,*,*,79,
        80,*,*,*,*,*,*,*,*,89,
        90,*,*,*,*,*,*,*,*,99,

    ]








*/

// display numbers, how many mines are near-by that square


function cellNumbers () {
    for (let i = 0; i < board.length; i++) {
        let adjMinesCount = 0
        const leftEdgeColumn = (i % width === 0)  // index 10 % width which is also 10 === 0 therefore left edge
        
        // index 9,19,29 and so on ... i = 19 % 10 === 9 which is width - 1 and that would be out right edge
        const rightEdgeColumn = (i % width === width - 1)
  
        if (board[i].classList.contains('no_bomb')) {
          if (i > 0 && !leftEdgeColumn && board[i - 1].classList.contains('has_bomb')) adjMinesCount ++
          if (i > 9 && !rightEdgeColumn && board[i + 1 - width].classList.contains('has_bomb')) adjMinesCount ++
          if (i > 10 && board[i -width].classList.contains('has_bomb')) adjMinesCount ++
          if (i > 11 && !leftEdgeColumn && board[i - 1 - width].classList.contains('has_bomb')) adjMinesCount ++
          if (i < 88 && !rightEdgeColumn && board[i + 1 + width].classList.contains('has_bomb')) adjMinesCount ++
          if (i < 89 && !leftEdgeColumn && board[i + width].classList.contains('has_bomb')) adjMinesCount ++ 
          if (i < 90 && !leftEdgeColumn && board[i - 1 + width].classList.contains('has_bomb')) adjMinesCount ++
          if (i < 98 && !rightEdgeColumn && board[i + 1].classList.contains('has_bomb')) adjMinesCount ++
          board[i].setAttribute('totalNum', adjMinesCount)
        }
      }
}

function handleClick(cell) {
    if (cell.classList.contains('has_bomb')) {
        console.log("gameOver")

    }

    else {
        let adjMinesCount = cell.getAttribute('totalNum');
        if (adjMinesCount > 0) {
            cell.classList.add('visited');
            cell.innerHTML = adjMinesCount;
            return;
        }

        // now if we click on cells that are empty they will also be marked checked
        cell.classList.add('visited');
    }
}