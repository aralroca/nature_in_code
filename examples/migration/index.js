
import { drawGrid, updateGrid } from './lib/visualize.js';

/**
 * Variables
 */
const gridLength = 100;
let grid;
let p = 0.5;
const maxMatingDistance = 50; 

/**
 * Init grid
 */
const initGrid = () => {
  grid = Array(gridLength)
    .fill(1)
    .map(x => Array(gridLength).fill(1)
      .map(() => {
        const x = Math.random(); 
        if (x < p * p) return 'A1A1';  
        if (x > 1 - (1 - p) * (1 - p)) return 'A2A2'; 
        else return 'A1A2'; 
      }));
};

/**
 * Pick Mating Partner
 */
const pickMatingPartner = (i, ii) => {
  const getBoundedIndex = i => {
    if (i < 0) return i + gridLength; 
    else if (i >= gridLength) return i - gridLength; 
    else return i;
  };

  const getRandomIndex = (min, max) => getBoundedIndex(Math.floor(Math.random() * (max - min + 1)) + min);

  const j = getRandomIndex(i - maxMatingDistance, i + maxMatingDistance);
  const jj = getRandomIndex(ii - maxMatingDistance, ii + maxMatingDistance);

  return grid[j][jj];
};

/**
* Get Offstring
* @param p1 - String (parent1)
* @param p2 - String (parent2)  
* @return String
*/
const getOffstring = (p1, p2) => {
  if (p1 === 'A1A1' && p2 === 'A1A1') return 'A1A1'; 
  if (p1 === 'A1A1' && p2 === 'A1A2' || p2 === 'A1A1' && p1 === 'A1A2')
    return Math.random() < 0.5 ? 'A1A1' : 'A1A2'; 
  if (p1 === 'A1A1' && p2 === 'A2A2' || p2 === 'A1A1' && p1 === 'A2A2')
    return 'A1A2';
  if (p1 === 'A1A2' && p2 === 'A1A2') {
    let n = Math.random();
    if (n < 0.25) return 'A1A1';
    if (n > 0.75) return 'A2A2';
    return 'A1A2';
  }
  if (p1 === 'A2A2' && p2 === 'A1A2' || p2 === 'A2A2' && p1 === 'A1A2')
    return Math.random() < 0.5 ? 'A2A2' : 'A1A2';
  if (p1 === 'A2A2' && p2 === 'A2A2') return 'A2A2'; 
};

/**
 * Run generation
 */
const runGeneration = () => {
  let arrayGrid = Array(gridLength).fill(1);

  let tempGrid = arrayGrid.map((x, i) => arrayGrid.map((xx, ii) => getOffstring(grid[i][ii], pickMatingPartner(i, ii))));

  tempGrid.forEach((x, i) => x.forEach((xx, ii) => grid[i][ii] = xx));
};

initGrid();
drawGrid(grid);

const simulateAndVisualize = () => {
  runGeneration();
  updateGrid(grid);
};

setInterval(simulateAndVisualize, 100);
