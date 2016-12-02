import { drawLineChart } from './lib/visualize.js';

const s = 0.1;
const h = 1.5; // Change 0.2 to -1.5
const generations = 400;
const data = [];

const calculateDeltaP = (s, h, p, q) => 
  (p * q * s * (p * h + q * (1 - h))) / (1 - 2* p * q * h * s - 2 * q * s);
  
// Add pValues an array of 99 0.01 to 1 (1 not included)  
const pValues = Array(99).fill(1);

// Modify p values vs time
pValues.forEach((x, i, a) => (a[i] = (a[i-1] || 0) + 0.01));

const runSimulation = p => {
  const results = Array(400).fill(1)
    .map(x => {
      const deltaP = calculateDeltaP(s, h, p, 1 - p);
      p += deltaP;
      return p;
    });
    data.push(results);
};

// Run simulations with p as a parameter
pValues.forEach(runSimulation);

drawLineChart(data, 'Generation', 'p', []);

