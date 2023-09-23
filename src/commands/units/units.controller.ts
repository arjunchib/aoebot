import { AutocompleteInteraction, SlashInteraction, inject, b } from "blurp";
import { UnitsService } from "../../services/units.service";

export class UnitsController {
  private unitService = inject(UnitsService);

  async slash(interaction: SlashInteraction) {
    const nameOption = interaction.data.options?.find(
      (opt) => opt.name === "name"
    );
    if (!nameOption)
      return interaction.respondWith("Could not find that unit!");
    const unit = this.unitService.get(nameOption.value);
    interaction.respondWith(
      `\`\`\`${JSON.stringify(unit, null, 2).slice(0, 1000)}\`\`\``
    );
  }

  async autocomplete(interaction: AutocompleteInteraction) {
    const option = interaction.data?.options?.find((opt) => opt.focused);
    if (!option) return interaction.respondWith([]);
    const choices = this.unitService
      .listNames()
      .filter((name) =>
        this.normalizeQuery(name).startsWith(this.normalizeQuery(option.value))
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
}
