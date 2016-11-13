import { drawLineChart } from './lib/visualize.js';
import { round } from './lib/utils.js';

const N = 1000;
const generations = 1000;
const data = Array(generations).fill(1);

const nextGeneration = n => p => Array(n * 2).fill(1)
  .map(x => Math.random() < p)
  .filter(a1 => a1).length / (n * 2);

const nextGenerationKIndividuals = nextGeneration(N);

data.forEach((p, i, a) => a[i] = nextGenerationKIndividuals(a[i-1] || 0.5));

drawLineChart(data,"Generation","p",["Population Size:",N,"Generations:",generations]);
