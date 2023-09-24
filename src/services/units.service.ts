import units from "../../data/all.json";

export type Unit = (typeof units)["data"][number];

export class UnitsService {
  get(civilization: string, name: string) {
    return this.getByCivilization(civilization).find(
      (unit) => unit.name === name
    );
  }

  listNames(civilization: string) {
    return this.getByCivilization(civilization).map((unit) => unit.name);
  }

  private getByCivilization(civilization: string) {
    return units.data.filter((unit) => unit.civs.includes(civilization));
  }
}
