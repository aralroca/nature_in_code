
const p = 0.40;
const q = 0.60;

const generation0 = { 
    "a1a1": 0.15,
    "a1a2": 0.50,
    "a2a2": 0.35
 };

const round = (value, decimals = 2) => {
    const shifter = Math.pow(10, decimals);
    return Math.round(value * shifter) / shifter;
}

// Calculate next generation 
const nextGeneration = (p,q) => ({
    "a1a1": round(p * p),
    "a1a2": round(2 * p * q),
    "a2a2": round(q * q) 
});

console.log(`generation 0`, generation0);

// Next 5 generations:
for(let i = 0; i < 5; i += 1) {
    console.log(`generation ${i+1}`, nextGeneration(0.4, 0.6));
}