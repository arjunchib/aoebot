import {
  AutocompleteInteraction,
  ComponentType,
  Embed,
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

const CIV_COLORS: Record<string, number> = {
  en: 0xfff1f1,
  hr: 0xebdd71,
  fr: 0x2f7ec3,
  ch: 0xc34825,
  de: 0x379d54,
  ab: 0x51565c,
  ma: 0xcd3c63,
  mo: 0x3680b9,
  ot: 0x407846,
  ru: 0xcd5747,
};

const STAT_SEPARATOR = " "; // a wide space

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
    if (interaction.data.componentType === ComponentType.Button) {
      const [civ, id] = interaction.data.customId.split(",");
      this.unit = Unit.get(civ, id);
      this.civilization = civ;
      interaction.respondWith({ ...this.message, update: true });
    } else if (interaction.data.componentType === ComponentType.StringSelect) {
      const id = interaction.data.values?.[0] || "";
      this.civilization = interaction.data.customId;
      this.unit = Unit.get(this.civilization, id);
      interaction.respondWith({ ...this.message, update: true });
    }
  }

  private get message() {
    return {
      embeds: [this.embed],
      components: this.components,
    };
  }

  private get components() {
    if (!this.civilization) throw new Error("Cannot find civilization");
    const select = b.stringSelect({
      customId: this.civilization,
      maxValues: 1,
      options: Unit.getByCivilization(this.civilization)
        .map((unit) => ({
          label: unit.name,
          value: unit.id,
        }))
        .slice(0, 25),
    });
    return [[select]];
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
    return costsArr.join(STAT_SEPARATOR);
  }

  private get embed(): Embed {
    if (!this.civilization) throw new Error("Cannot find civilization");
    if (!this.unit) throw new Error("Cannot find unit");
    return {
      title: this.unit.name,
      url: this.url,
      description: this.description,
      thumbnail: { url: this.unit.icon },
      fields: this.fields,
      color: CIV_COLORS[this.civilization],
      footer: {
        text: CIV_SLUGS[this.civilization],
      },
    };
  }

  private get url() {
    if (!this.civilization) return undefined;
    const civ = CIV_SLUGS[this.civilization];
    const unit = this.unit?.baseId;
    return `https://aoe4world.com/explorer/civs/${civ}/units/${unit}`;
  }

  private get description() {
    if (!this.unit) throw new Error("Cannot find unit");
    return [this.costs, this.stats].join(STAT_SEPARATOR);
  }

  private get stats() {
    if (!this.unit) throw new Error("Cannot find unit");
    const statsArr = [];
    const stats = {
      "♥️": this.unit.hitpoints,
      "🏃‍♂️": this.unit.movement.speed,
      "👁️": this.unit.sight.line,
      "🪖": this.unit.armor.find((armor) => armor.type === "melee")?.value,
      "🛡️": this.unit.armor.find((armor) => armor.type === "ranged")?.value,
    };
    for (const [k, v] of Object.entries(stats)) {
      if (v) statsArr.push(`${k} **${v}**`);
    }
    return statsArr.join(STAT_SEPARATOR);
  }

  private get fields(): Embed["fields"] {
    if (!this.unit) throw new Error("Cannot find unit");
    return this.unit.weapons.map((weapon) => ({
      inline: true,
      name: `${weapon.name} (${weapon.type})`,
      value: `${(weapon.damage / weapon.speed).toFixed(2)}`,
    }));
  }
}
