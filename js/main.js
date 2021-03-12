

/*----- constants -----*/

const colorLookUp = {
    '1': 'red',
    '2': 'green',
    '3': 'blue',
    '4': 'yellow',
    '5': "purple"
}

const sound = {
  bombExplosion: "https://freesound.org/data/previews/399/399303_5405837-lq.mp3",

}


const player = new Audio();

 /*----- app's state (variables) -----*/

 let flags = 0;
 let board = [];
 let numberOfBombs = 15;
 let width = 10;
 let gameOver = false;

 let explosion;
 



  /*----- cached element references -----*/

  const gridEl = document.querySelector('.grid');
  const flagsLeft = document.querySelector('#flags-left');
  const result = document.querySelector('#result');
  const resetBtn = document.getElementById('reset');


  const bgmEl = document.getElementById('bgm');

 
  /*----- event listeners -----*/


  resetBtn.addEventListener('click', replay);

  function replay(e){
      e.target = window.location.reload();
   }




/*----- functions -----*/
init();


function explosionSound(){
  player.src = sound.bombExplosion
  player.play();
  
}



function init(){



    resetBtn.style.display = 'none';
    flagsLeft.innerHTML = numberOfBombs;

   // random bomb placements
   const bombFiller = Array(numberOfBombs).fill('has_bomb'); // an array that will fill the grid cells with bombs
   const emptyBoard = Array(100 - numberOfBombs).fill('no_bomb'); // an array that doesn't have any bombs in it

   // now we need to combine those two arrays above. There is a method called concat that joins two arrays together 

   const completeBoard = emptyBoard.concat(bombFiller);

   // creating a mix array filled with both values

   const mixArray = completeBoard.sort(() => Math.random() -0.5);
   



   for (let i = 0; i < 100; i++) {
       //we want 100 sqaures divs
    const cell = document.createElement('div');
    cell.setAttribute('id', i); // this will give the square a unique id
    
    gridEl.appendChild(cell); // 100 divs will be put into .grid class
    board.push(cell);
    
    cell.classList.add(mixArray[i]) // we will also give it a class name so that way squares with bomb and without bombs can be differentiate

    // ^^ <div id='0' className="has_bomb" or className="no_bomb"> </div>

    // left/ normal mouse click
    cell.addEventListener('click', function(e) {

        handleClick(cell)
    })


     //cntrl and right click
     cell.oncontextmenu = function(e) {
        e.preventDefault()
        addFlag(cell)
      }


}

   


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

// display and add numbers, how many mines are near-by that square


function cellNumbers () {
    for (let i = 0; i < board.length; i++) {
        let adjMinesCount = 0
         
        const leftEdgeColumn = (i % width === 0)  // index 10 % width which is also 10 === 0 therefore left edge
        
        // index 9,19,29 and so on ... i = 19 % 10 === 9 which is width - 1 and that would be out right edge
        const rightEdgeColumn = (i % width === width - 1)
  
        if (board[i].classList.contains('no_bomb')) {

            // to get the cell value to the left of the cell
          if (i > 0 && !leftEdgeColumn && board[i - 1].classList.contains('has_bomb')) {
              adjMinesCount ++
            }
          // to get the right top corner
          if (i > 9 && !rightEdgeColumn && board[i + 1 - width].classList.contains('has_bomb')) {
              adjMinesCount ++
            }
          // to get the cell right above 
          if (i > 10 && board[i -width].classList.contains('has_bomb')) {
              adjMinesCount ++
            }
            // top left corner cell
          if (i > 11 && !leftEdgeColumn && board[i - 1 - width].classList.contains('has_bomb')) {
              adjMinesCount ++
            }
            // next right cell 
            if (i < 98 && !rightEdgeColumn && board[i + 1].classList.contains('has_bomb')) {
                adjMinesCount ++
              }
              // bottom left corner cell
              if (i < 90 && !leftEdgeColumn && board[i - 1 + width].classList.contains('has_bomb')) {
                  adjMinesCount ++
                }
          // bottom right corner cell
          if (i < 88 && !rightEdgeColumn && board[i + 1 + width].classList.contains('has_bomb')) {
              adjMinesCount ++
            }
          // right below cell
          if (i < 89 && !leftEdgeColumn && board[i + width].classList.contains('has_bomb')) {
              adjMinesCount ++
            } 


          // now our div will hold another class name totaNum and that will have a count in each cell
          board[i].setAttribute('totalNum', adjMinesCount)
        }
      }
}

function handleClick(cell) {

    // if game is over we return, nothing happens
    if (gameOver) return

    let currIdx = cell.id;

    // if the square has been clicked or has a flag on it then we also return
    if (cell.classList.contains('visited') || cell.classList.contains('flag')) return



    if (cell.classList.contains('has_bomb') ) {
        gameOverFunc(cell)
        explosionSound()
        
        resetBtn.style.display = 'block';

    }
        else {
        let adjMinesCount = cell.getAttribute('totalNum');

        // if number totNum adds to 0 then we don't care, we only care if the number is bigger than zero
        if (adjMinesCount != 0) {
            cell.classList.add('visited');

            if (adjMinesCount == 1) {cell.style.color = colorLookUp[1]  }
            if (adjMinesCount == 2) {cell.style.color = colorLookUp[2]  }
            if (adjMinesCount == 3) {cell.style.color = colorLookUp[3]  }
            if (adjMinesCount == 4) {cell.style.color = colorLookUp[4]  }
            cell.innerHTML = adjMinesCount;
            return;
        }
        checkNeighborCell(cell, currIdx);
    }
    // now if we click on cells that are empty they will also be marked checked
    cell.classList.add('visited');
}

//check neighboring squares once square is clicked
function checkNeighborCell(cell, currIdx) {
    const isLeftEdge = (currIdx % width === 0)
    const isRightEdge = (currIdx % width === width -1)

    setTimeout(() => {
      if (currIdx > 0 && !isLeftEdge) {
        const newId = board[parseInt(currIdx) -1].id // create new id given by curridx and assign it to newId

        const newCell = document.getElementById(newId)   // newCell will get the new id
        handleClick(newCell) //call handleclick function on new id to check for other cells
      }
      if (currIdx > 9 && !isRightEdge) {
        const newId = board[parseInt(currIdx) +1 -width].id
        
        const newCell = document.getElementById(newId)
        handleClick(newCell)
      }
      if (currIdx > 10) {
        const newId = board[parseInt(currIdx -width)].id
        
        const newCell = document.getElementById(newId)
        handleClick(newCell)
      }
      if (currIdx > 11 && !isLeftEdge) {
        const newId = board[parseInt(currIdx) -1 -width].id
        
        const newCell = document.getElementById(newId)
        handleClick(newCell)
      }
      if (currIdx < 98 && !isRightEdge) {
        const newId = board[parseInt(currIdx) +1].id
        const newCell = document.getElementById(newId)
        handleClick(newCell)
      }
      if (currIdx < 90 && !isLeftEdge) {
        const newId = board[parseInt(currIdx) -1 +width].id
        
        const newCell = document.getElementById(newId)
        handleClick(newCell)
      }
      if (currIdx < 88 && !isRightEdge) {
        const newId = board[parseInt(currIdx) +1 +width].id
        
        const newCell = document.getElementById(newId)
        handleClick(newCell)
      }
      if (currIdx < 89) {
        const newId = board[parseInt(currIdx) +width].id
        
        const newCell = document.getElementById(newId)
        handleClick(newCell)
      }
    }, 100)
  }


//add Flag with right click
function addFlag(cell) {
    if (gameOver) return
    
    // if the square is not already been visited and number of flags are less than bombs number
    if (!cell.classList.contains('visited') && (flags < numberOfBombs)) {

      // also the cell doesn't contain flag already
      if (!cell.classList.contains('flag')) {
        cell.classList.add('flag')

        // add the flag emoji once clicked with right click or control + left click
        cell.innerHTML = ' 🎌 '
        flags += 1  // increase the flag count

        // also decrease the flags left count from top
        flagsLeft.innerHTML = numberOfBombs- flags

        // if all of the flags placed on the right cells as in square that actually do contain bombs then call for win function
        checkForWin();
      } else {
        // to remove a flag 
        cell.classList.remove('flag')
        cell.innerHTML = ''
        flags -= 1
        flagsLeft.innerHTML = numberOfBombs- flags
      }
    }
  }

 //determine when a player has won
 function checkForWin() {
   
  let flagsCount = 0

    for (let i = 0; i < board.length; i++) {
      if (board[i].classList.contains('flag') && board[i].classList.contains('has_bomb')) {
        flagsCount += 1
      }
      // once all the flags have been placed on squares that actually contain the bombs then the game should declare a winner and ends right away
      if (flagsCount === numberOfBombs) {
        result.innerHTML = "WOW YOU ARE A PRO!!!";
        gameOver = true;
        resetBtn.style.display = 'block';
      }
    }
  }


  //determine when a game is over
  function gameOverFunc(cell) {
    result.innerHTML = 'OOPS! you clicked on a bomb 💣';
    gameOver = true;

    //just show all the bombs
    board.forEach(cell => {
      if (cell.classList.contains('has_bomb')) {
        cell.innerHTML = '💥';
        cell.classList.remove('has_bomb');

        // reveal the bombs 
        cell.classList.add('visited');
      }
    })
  }