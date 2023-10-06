export interface Test {
    __note__:    string;
    __version__: string;
    data:        Datum[];
}

export interface Datum {
    id:             string;
    baseId:         string;
    type:           TypeElement;
    name:           string;
    pbgid:          number;
    attribName:     string;
    age:            number;
    civs:           Civ[];
    description:    string;
    classes:        TypeEnum[];
    displayClasses: string[];
    unique:         boolean;
    costs:          Costs;
    producedBy:     string[];
    icon:           string;
    hitpoints?:     number;
    weapons:        Weapon[];
    armor:          Armor[];
    sight:          Sight;
    movement:       Movement;
    garrison?:      Garrison;
}

export interface Armor {
    type:  TypeElement;
    value: number;
}

export enum TypeElement {
    Animal = "animal",
    Archer = "archer",
    Broadside = "broadside",
    Building = "building",
    Cavalry = "cavalry",
    Fireship = "fireship",
    Heavy = "heavy",
    Huntable = "huntable",
    Infantry = "infantry",
    Light = "light",
    Melee = "melee",
    Naval = "naval",
    Ranged = "ranged",
    Scout = "scout",
    Ship = "ship",
    Siege = "siege",
    Unit = "unit",
    Wall = "wall",
}

export enum Civ {
    Ab = "ab",
    Ch = "ch",
    De = "de",
    En = "en",
    Fr = "fr",
    Hr = "hr",
    Ma = "ma",
    Mo = "mo",
    Ot = "ot",
    Ru = "ru",
}

export enum TypeEnum {
    Archer = "archer",
    Army = "army",
    Camel = "camel",
    Cavalry = "cavalry",
    Elephant = "elephant",
    Fire = "fire",
    Force = "force",
    Gunpowder = "gunpowder",
    Heavy = "heavy",
    Incendiary = "incendiary",
    Infantry = "infantry",
    Khaganate = "khaganate",
    Light = "light",
    Melee = "melee",
    Mixed = "mixed",
    Ranged = "ranged",
    Religious = "religious",
    Ship = "ship",
    Siege = "siege",
    Springald = "springald",
    Warship = "warship",
    Worker = "worker",
}

export interface Costs {
    food:    number;
    wood:    number;
    stone:   number;
    gold:    number;
    total:   number;
    popcap?: number;
    time:    number;
}

export interface Garrison {
    capacity: number;
    classes:  GarrisonClass[];
}

export enum GarrisonClass {
    Cavalry = "cavalry",
    Infantry = "infantry",
    InfantryRanged = "infantry ranged",
    Khan = "khan",
    Monk = "monk",
    Siege = "siege",
    Trader = "trader",
    Villager = "villager",
}

export interface Movement {
    speed: number | null;
}

export interface Sight {
    line:   number;
    height: number;
}

export interface Weapon {
    name:       string;
    type:       TypeEnum;
    damage:     number;
    speed:      number;
    range:      Range;
    modifiers:  Modifier[];
    durations:  Durations;
    attribName: string;
    pbgid:      number;
    burst?:     Burst;
}

export interface Burst {
    count: number;
}

export interface Durations {
    aim:      number;
    windup:   number;
    attack:   number;
    winddown: number;
    reload:   number;
    setup:    number;
    teardown: number;
    cooldown: number;
}

export interface Modifier {
    property: Property;
    target:   Target;
    effect:   Effect;
    value:    number;
    type:     ModifierType;
}

export enum Effect {
    Change = "change",
}

export enum Property {
    FireAttack = "fireAttack",
    MeleeAttack = "meleeAttack",
    RangedAttack = "rangedAttack",
    SiegeAttack = "siegeAttack",
}

export interface Target {
    class: Array<TypeElement[]>;
}

export enum ModifierType {
    Passive = "passive",
}

export interface Range {
    min: number;
    max: number;
}
