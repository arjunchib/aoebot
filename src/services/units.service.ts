import units from "../../data/all-unified.json";

export class UnitsService {
  get(name: string) {
    return units.data.find((unit) => unit.name === name);
  }

  listNames() {
    return units.data.map((unit) => unit.name);
  }
}
