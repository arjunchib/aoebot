import { b } from "blurp";

export const UnitsCommand = b.slashCommand({
  name: "units",
  description: "learn about every aoe4 unit",
  options: [
    b.string({
      name: "name",
      description: "name of the unit",
      required: true,
      autocomplete: true,
    }),
  ],
});
