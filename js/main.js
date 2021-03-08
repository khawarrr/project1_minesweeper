

/*----- constants -----*/

const bombCount = 15;
 /*----- app's state (variables) -----*/

 let grid, winner;



  /*----- cached element references -----*/


  const gridEl = document.getElementById('grid');

  const resetBtn = document.getElementById('reset');



  /*----- event listeners -----*/
// resetBtn.addEventListener('click', init);

// boardEl.addEventListener('click', handleClick);



/*----- functions -----*/
init();

function init(){
    grid = new Array(99).fill(0);
    // assign bombs to random squares
    winner = null;
    render();
}

function render() {

    // const bombsArr = Array(bombCount).fill('bomb');

    // // render the grid
    // grid.forEach(function (boxVal, boxIdx) {
    //     document.getElementById(boxIdx).innerHTML = playerIcon[boxVal];
    // });
}
