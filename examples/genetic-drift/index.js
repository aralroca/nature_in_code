import { drawLineChart } from './lib/visualize.js';

const N = 1000;
const NBottleneck = 10;
const generations = 100;
const simulations = 10;
const p = 0.5;

// Every 10 generations 
const isBottleNeckGeneration = i => i % 10 === 9;

const nextGeneration = n => p => Array(n * 2).fill(1)
  .map(() => Math.random() < p)
  .filter(a1 => a1).length / (n * 2);

const getSimulation = () => {
  const nextGenerationKIndividuals = nextGeneration(N);
  const nextGenerationBottleneck = nextGeneration(NBottleneck);
  const simulation = Array(generations).fill(1);

  simulation.forEach((x, i, a) =>  a[i] = isBottleNeckGeneration(i) ? nextGenerationBottleneck(a[i-1] || p) : nextGenerationKIndividuals(a[i-1] || p));
  return simulation;
};

// Harmonic mean
const harmonicMean = array => Math.round(array.length / array.map(num => 1/num).reduce((a, b) => a+b));

// Ne, Effective population size 
const Ne = harmonicMean(Array(N*2).fill(N).map((x,i) => isBottleNeckGeneration(i)? NBottleneck: N));

drawLineChart(Array(simulations).fill(1).map(getSimulation),'Generation','p',['Eff. Population Size:',Ne,'Generations:',generations]);
