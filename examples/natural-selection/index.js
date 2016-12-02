import { drawLineChart } from './lib/visualize.js';

const generations = 4000; // Increment *10 generations
const sh = 0.2;
const sp = 0.5; 

/**
 * Selection (Host or Parasite)
 */
function selection(firstFreq, secondFreq, isHost = false) {
  const sum = (a, b) => a + b;
  const hostFit = i => (p, ii) => (i === ii ? 1-sh : 1) * p;
	const parasitFit = i => (h, ii) => (i === ii ? 1 : 1-sp) * h;
  const calcFit = i => (x, ii) => isHost? hostFit(i)(x, ii): parasitFit(i)(x, ii);
  const noise = Math.random() * 0.01; // Add NOISE

	const newFrequencies = firstFreq.map((x, i) =>
       x * secondFreq.map(calcFit(i)).reduce(sum, 0)+ noise); //Add NOISE

  const sumFrequencies = newFrequencies.reduce(sum, 0);

	return newFrequencies.map(x => x / sumFrequencies);
}

/**
 *  Visualization
 */
function runVisualization() {
  const tmpData = Array(generations).fill(1);
  const generateFreq = a1Freq => [a1Freq, 1 - a1Freq];
  let data = [[], [], [], []]; // Initialize to array with 4 arrays
  let hosts = generateFreq(Math.random());
  let parasites = generateFreq(Math.random());

  data.forEach((x, i, a) => a[i].push(i > 2 ? hosts[i%2] : parasites[i%2]));

  for(let i = 0; i < generations; i += 1) {
      hosts = selection(hosts, parasites, true);
      parasites = selection(parasites, hosts);
      data.forEach((x, i, a) => a[i].push(i > 2 ? hosts[i%2] : parasites[i%2]));
  }

  drawLineChart(data, "Generation", "p", []);
}

runVisualization();