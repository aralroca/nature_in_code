import { drawLineChart } from './lib/visualize.js';

const N = 200;
const generations = 2000;
const p = 0.5;

const nextGeneration = n => p => Array(n * 2).fill(1)
  .map(() => Math.random() < p)
  .filter(a1 => a1).length / (n * 2);

const getSimulation = () => {
  const nextGenerationKIndividuals = nextGeneration(N);
  const simulation = Array(generations).fill(1);

  simulation.forEach((x, i, a) => a[i] = nextGenerationKIndividuals(a[i-1] || p));
  return simulation;
};

drawLineChart(Array(10).fill(1).map(getSimulation),'Generation','p',['Population Size:',N,'Generations:',generations]);
