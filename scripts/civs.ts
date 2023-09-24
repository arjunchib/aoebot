import data from "../data/all.json";

const civs = new Set();
data.data.forEach((unit) => unit.civs.forEach((civ) => civs.add(civ)));

console.log(civs);
