import { AutocompleteInteraction, SlashInteraction, inject } from "blurp";
import { Unit, UnitService } from "../../services/unit.service";
import { UnitsCommand } from "./units.command";

const COSTS_EMOJIS: Record<string, string> = {
  food: "🥩",
  wood: "🪵",
  stone: "🪨",
  gold: "🪙",
  popcap: "💂‍♂️",
  time: "🕑",
};

export class UnitsController {
  private unitService = inject(UnitService);
  private unit?: Unit;

  async slash(interaction: SlashInteraction<typeof UnitsCommand>) {
    const { civilization, name } = interaction.options;
    this.unit = this.unitService.get(civilization.value, name.value);
    interaction.respondWith(this.embed);
  }

  async autocomplete(
    interaction: AutocompleteInteraction<typeof UnitsCommand>
  ) {
    const { civilization, name } = interaction.options;
    const choices = this.unitService
      .list(civilization.value, name.value)
      .map((unit) => ({
        name: unit.name,
        value: unit.name,
      }));
    interaction.respondWith(choices.slice(0, 25));
  }

  private get costs(): string {
    if (!this.unit) throw new Error("Cannot find unit");
    let costsArr = [];
    const costs: Partial<Unit["costs"]> = structuredClone(this.unit.costs);
    delete costs.total;
    if (costs.popcap === 1) delete costs.popcap;
    for (const [k, v] of Object.entries(costs)) {
      if (v > 0) {
        costsArr.push(`${COSTS_EMOJIS[k]} **${v}**`);
      }
    }
    return costsArr.join(" ");
  }

  private get embed() {
    if (!this.unit) throw new Error("Cannot find unit");
    const embeds = [
      {
        title: this.unit.name,
        description: [this.costs, this.unit.description].join("\n"),
        thumbnail: { url: this.unit.icon },
      },
    ];
    return { embeds };
  }
}
