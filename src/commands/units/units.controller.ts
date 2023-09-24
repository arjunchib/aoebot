import { AutocompleteInteraction, SlashInteraction, inject, b } from "blurp";
import { Unit, UnitsService } from "../../services/units.service";

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

  async slash(interaction: SlashInteraction) {
    const civOption = interaction.data.options?.find(
      (opt) => opt.name === "civilization"
    );
    const nameOption = interaction.data.options?.find(
      (opt) => opt.name === "name"
    );
    const unit = this.unitService.get(civOption?.value, nameOption?.value);
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

  async autocomplete(interaction: AutocompleteInteraction) {
    const civOption = interaction.data.options?.find(
      (opt) => opt.name === "civilization"
    );
    const nameOption = interaction.data.options?.find(
      (opt) => opt.name === "name"
    );
    const choices = this.unitService
      .listNames(civOption?.value)
      .filter((name) =>
        this.normalizeQuery(name).startsWith(
          this.normalizeQuery(nameOption?.value)
        )
      )
      .map((name) => ({
        name,
        value: name,
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
