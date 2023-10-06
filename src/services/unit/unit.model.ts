import UNIT_DATA from "./units.json";
import { Datum } from "./unit.interface";

export interface Unit extends Datum {}

export class Unit {
  static get(civilization: string, id: string) {
    return this.getByCivilization(civilization).find((unit) => unit.id === id);
  }

  static list(civilization: string, name?: string) {
    let units = this.getByCivilization(civilization);
    if (name) {
      units = units.filter((unit) => {
        const listName = this.normalizeQuery(unit.name);
        const searchName = this.normalizeQuery(name);
        return listName.startsWith(searchName);
      });
    }
    return units;
  }

  static getByCivilization(civilization: string) {
    return UNIT_DATA.data
      .filter((unit) => unit.civs.includes(civilization))
      .map((unit) => new Unit(unit as any));
  }

  static normalizeQuery(query: string) {
    return query.toLowerCase().replaceAll(" ", "");
  }

  private constructor(unit: Datum) {
    Object.assign(this, unit);
  }

  similar() {
    return Unit.getByCivilization(this.civs[0]).filter(
      (unit) => unit.baseId === this.baseId && unit.id !== this.id
    );
  }
}
