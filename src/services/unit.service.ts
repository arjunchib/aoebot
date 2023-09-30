import UNIT_DATA from "../../data/all.json";

export type Unit = (typeof UNIT_DATA)["data"][number];

export class UnitService {
  get(civilization: string, name: string) {
    return this.getByCivilization(civilization).find(
      (unit) => unit.name === name
    );
  }

  list(civilization: string, name?: string) {
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

  private getByCivilization(civilization: string) {
    return UNIT_DATA.data.filter((unit) => unit.civs.includes(civilization));
  }

  private normalizeQuery(query: string) {
    return query.toLowerCase().replaceAll(" ", "");
  }
}
