
import { drawLineChart } from './lib/visualize.js';

const N = 1000; 
const generations = 4000; 
const simulations = 10; 
const p = 0.02; 

const nextGeneration = n => p => Array(n * 2).fill(1)
  .map(() => Math.random() < p * 1.01)
  .filter(a1 => a1).length / (n * 2);

const getSimulation = () => {
  const nextGenerationKIndividuals = nextGeneration(N);
  const simulation = Array(generations).fill(1);

  simulation.forEach((x, i, a) =>  a[i] = nextGenerationKIndividuals(a[i-1] || p));
  return simulation;
};

const harmonicMean = array => Math.round(array.length / array.map(num => 1/num).reduce((a, b) => a+b));

const Ne = harmonicMean(Array(N*2).fill(N));

drawLineChart(Array(simulations).fill(1).map(getSimulation),'Generation','p',['Eff. Population Size:',Ne,'Generations:',generations]);
