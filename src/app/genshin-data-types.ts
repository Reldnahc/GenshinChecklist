import {Subject} from "rxjs";

export class Material{
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  toString(){
    return this.name;
  }
}

export class RegionalSpecialty extends Material{
  region: string;
  wiki: string;
  characters: string[];

  constructor(name: string, region: string, wiki: string, characters: string[]) {
    super(name);
    this.region = region;
    this.wiki = wiki;
    this.characters = characters;
  }

}

export class BossMaterial extends Material{
  boss: string;
  wiki: string;
  characters: string[];
  region: string;

  constructor(name: string, boss: string, wiki: string, characters: string[], region: string) {
    super(name);
    this.boss = boss;
    this.wiki = wiki;
    this.characters = characters;
    this.region = region;
  }
}
export class TalentMaterial extends Material{
  domain: string;
  wiki: string;
  characters: string[];
  days: string[];
  items: {
    "uncommon": string,
    "rare": string,
    "epic": string
  };


  constructor(name: string, domain: string, wiki: string, characters: string[], days: string[], items: {
    "uncommon": string,
    "rare": string,
    "epic": string
  }) {
    super(name);
    this.domain = domain;
    this.wiki = wiki;
    this.characters = characters;
    this.days = days;
    this.items = items;
  }
}

export class AscensionMaterial extends Material{
  enemies: string[];
  wiki: string;
  ascensionCharacters: string[];
  talentCharacters: string[];
  weapons: string[];
  drops: {
    "common": string,
    "uncommon": string,
    "rare": string,
    "epic": string
  } ;


  constructor(name: string, enemies: string[], wiki: string, ascensionCharacters: string[], talentCharacters: string[], weapons: string[], drops: {
    "common": string,
    "uncommon": string,
    "rare": string,
    "epic": string
  } ) {
    super(name);
    this.enemies = enemies;
    this.wiki = wiki;
    this.ascensionCharacters = ascensionCharacters;
    this.talentCharacters = talentCharacters;
    this.weapons = weapons;
    this.drops = drops;
  }
}

export class Character extends Material{
  element: string;
  rarity: string;
  weapon: string;
  regionalSpecialty: RegionalSpecialty;
  bossMaterial: BossMaterial;
  ascensionMaterial: AscensionMaterial;
  talentMaterial: TalentMaterial;
  weeklyBossMaterial: BossMaterial;
  selected: Subject<boolean> = new Subject<boolean>();

  constructor(name: string, element: string, rarity: string, weapon: string, regionalSpecialty: RegionalSpecialty,
              bossMaterial: BossMaterial, ascensionMaterial: AscensionMaterial, talentMaterial: TalentMaterial,
              weeklyBossMaterial: BossMaterial) {
    super(name);
    this.element = element;
    this.rarity = rarity;
    this.weapon = weapon;
    this.regionalSpecialty = regionalSpecialty;
    this.bossMaterial = bossMaterial;
    this.ascensionMaterial = ascensionMaterial;
    this.talentMaterial = talentMaterial;
    this.weeklyBossMaterial = weeklyBossMaterial;
  }
}


