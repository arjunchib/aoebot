import { AutocompleteInteraction, SlashInteraction, inject } from "blurp";
import { Unit, UnitsService } from "../../services/units.service";
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
  private unitService = inject(UnitsService);

  async slash(interaction: SlashInteraction<typeof UnitsCommand>) {
    const { civilization, name } = interaction.options;
    const unit = this.unitService.get(civilization.value, name.value);
    if (!unit) return interaction.respondWith("Could not find that unit!");
    const description = [this.costs(unit), unit.description].join("\n");
    interaction.respondWith({
      embeds: [
        {
          title: unit.name,
          description,
          thumbnail: { url: unit.icon },
        },
      ],
    });
  }

  async autocomplete(
    interaction: AutocompleteInteraction<typeof UnitsCommand>
  ) {
    const { civilization, name } = interaction.options;
    const choices = this.unitService
      .listNames(civilization.value)
      .filter((n) =>
        this.normalizeQuery(n).startsWith(this.normalizeQuery(name.value))
      )
      .map((n) => ({
        name: n,
        value: n,
      }));
    interaction.respondWith(choices.slice(0, 25));
  }

  private normalizeQuery(query: string) {
    return query.toLowerCase().replaceAll(" ", "");
  }

  private costs(unit: Unit): string {
    let costsArr = [];
    const costs: Partial<Unit["costs"]> = structuredClone(unit.costs);
    delete costs.total;
    if (costs.popcap === 1) delete costs.popcap;
    for (const [k, v] of Object.entries(costs)) {
      if (v > 0) {
        costsArr.push(`${COSTS_EMOJIS[k]} **${v}**`);
      }
    }
    return costsArr.join(" ");
  }
}
