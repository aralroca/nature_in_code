import { drawGrid, updateGrid } from './lib/visualize.js';

const gridLength = 75;
let grid;
let tempGrid = [];
const beta = 0.05; 
const gamma = 0.1;

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const initGrid = () => {
  grid = Array(gridLength).fill(1).map(x => Array(gridLength).fill('S'));
  grid[getRandomInt(0, gridLength - 1)][getRandomInt(0, gridLength - 1)] = 'I';
};

const getBoundedIndex = i => {
  let boundedIndex = i;
  if (i < 0) boundedIndex = i + gridLength;
  if (i >= gridLength) boundedIndex = i - gridLength;
  return boundedIndex;
};

/**
 * Try Infection
 */
const tryInfection = (i, ii) => {
  if (grid[i][ii] == 'S' && Math.random() < beta) {
    tempGrid[i][ii] = 'I';
  }
};

/**
 * Try Recovery
 */
const tryRecovery = (i, ii) => {
  if (grid[i][ii] == 'I' && Math.random() < gamma) {
    tempGrid[i][ii] = 'R';
  }
};

const exposeNeighbors = (i, ii) => {
  for (var n_i = i - 1; n_i <= i + 1; n_i = n_i + 1) {
    for (var n_ii = ii - 1; n_ii <= ii + 1; n_ii = n_ii + 1) {
      if (n_i !== i || n_ii !== ii) {
        tryInfection(getBoundedIndex(n_i), getBoundedIndex(n_ii));
      }
    }
  }
};

const runTimeStep = () => {
  for (let i = 0; i < gridLength; i = i + 1) {
    tempGrid[i] = [];
    for (let ii = 0; ii < gridLength; ii = ii + 1) {
      tempGrid[i][ii] = grid[i][ii];
    }
  }
  for (let i = 0; i < gridLength; i = i + 1) {
    for (let ii = 0; ii < gridLength; ii = ii + 1) {
      if (grid[i][ii] == 'I') {
        exposeNeighbors(i, ii);
        tryRecovery(i, ii);
      }
    }
  }
  for (let i = 0; i < gridLength; i = i + 1) {
    for (let ii = 0; ii < gridLength; ii = ii + 1) {
      grid[i][ii] = tempGrid[i][ii];
    }
  }
};

initGrid();

drawGrid(grid, ['S', '#dcdcdc', 'I', '#c82605', 'R', '#6fc041']);

setInterval(() => {
  runTimeStep();
  updateGrid(grid, ['S', '#dcdcdc', 'I', '#c82605', 'R', '#6fc041']);
}, 50);
