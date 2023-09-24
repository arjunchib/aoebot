import { b } from "blurp";

const choices = [
  {
    name: "English",
    value: "en",
  },
  {
    name: "Holy Roman Empire",
    value: "hr",
  },
  {
    name: "French",
    value: "fr",
  },
  {
    name: "Chinese",
    value: "ch",
  },
  {
    name: "Delhi Sultanate",
    value: "de",
  },
  {
    name: "Abbasid Dynasty",
    value: "ab",
  },
  {
    name: "Malians",
    value: "ma",
  },
  {
    name: "Mongols",
    value: "mo",
  },
  {
    name: "Ottomans",
    value: "ot",
  },
  {
    name: "Rus",
    value: "ru",
  },
];

export const UnitsCommand = b.slashCommand({
  name: "units",
  description: "learn about every aoe4 unit",
  options: [
    b.string({
      name: "civilization",
      description: "civ the unit belongs to",
      required: true,
      choices,
    }),
    b.string({
      name: "name",
      description: "name of the unit",
      required: true,
      autocomplete: true,
    }),
  ],
});
