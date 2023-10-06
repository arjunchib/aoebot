import {
  AutocompleteInteraction,
  MessageComponentInteraction,
  SlashInteraction,
  b,
} from "blurp";
import { Unit } from "../../services/unit/unit.model";
import { UnitsCommand } from "./units.command";

const COSTS_EMOJIS: Record<string, string> = {
  food: "🥩",
  wood: "🪵",
  stone: "🪨",
  gold: "🪙",
  popcap: "💂‍♂️",
  time: "🕑",
};

const CIV_SLUGS: Record<string, string> = {
  en: "english",
  hr: "hre",
  fr: "french",
  ch: "chinese",
  de: "delhi",
  ab: "abbasid",
  ma: "malians",
  mo: "mongols",
  ot: "ottomans",
  ru: "rus",
};

export class UnitsController {
  private unit?: Unit;
  private civilization?: string;

  slash(interaction: SlashInteraction<typeof UnitsCommand>) {
    const { civilization, name } = interaction.options;
    this.civilization = civilization.value;
    this.unit = Unit.get(civilization.value, name.value);
    interaction.respondWith(this.message);
  }

  autocomplete(interaction: AutocompleteInteraction<typeof UnitsCommand>) {
    const { civilization, name } = interaction.options;
    if (!civilization || !name) return interaction.respondWith([]);
    const choices = Unit.list(civilization.value, name.value).map((unit) => ({
      name: unit.name,
      value: unit.id,
    }));
    interaction.respondWith(choices.slice(0, 25));
  }

  messageComponent(interaction: MessageComponentInteraction) {
    const [civ, id] = interaction.data.customId.split(",");
    this.unit = Unit.get(civ, id);
    interaction.respondWith({ ...this.message, update: true });
  }

  private get message() {
    return {
      embeds: [this.embed],
      components: this.buttonRow?.length ? [this.buttonRow] : undefined,
    };
  }

  private get buttonRow() {
    return this.unit
      ?.similar()
      .map((unit) =>
        b.button({
          customId: [unit.civs[0], unit.id].join(","),
          label: unit.name,
        })
      )
      .slice(0, 5);
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
    return {
      title: this.unit.name,
      url: this.url,
      description: [this.costs, this.unit.description].join("\n"),
      thumbnail: { url: this.unit.icon },
    };
  }

  private get url() {
    if (!this.civilization) return undefined;
    const civ = CIV_SLUGS[this.civilization];
    const unit = this.unit?.baseId;
    return `https://aoe4world.com/explorer/civs/${civ}/units/${unit}`;
  }
}
