import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AscensionMaterial, BossMaterial, Character, RegionalSpecialty, TalentMaterial} from "./genshin-data-types";

@Injectable({
  providedIn: 'root'
})
export class GenshinDataService {

  private characters: Character[] = [];
  private regionalSpecialties: RegionalSpecialty[] = [];
  private bossMaterials: BossMaterial[] = [];
  private ascensionMaterials: AscensionMaterial[] = [];
  private talentMaterials: TalentMaterial[] = [];

  private regionalSpecialtiesComplete: boolean = false;
  private bossMaterialsComplete: boolean = false;
  private ascensionMaterialsComplete: boolean = false;
  private talentMaterialsComplete: boolean = false;


  constructor(private http: HttpClient) {

    this.refreshData();
  }

  private refreshData() {
    this.http.get("assets/json/regional.json").subscribe(data => {
      for (let specialty of data as any) {
        this.regionalSpecialties.push(new RegionalSpecialty(specialty.name, specialty.region, specialty.wiki, specialty.characters));
      }
      this.http.get("assets/json/boss-materials.json").subscribe(data => {
        for (let material of data as any) {
          this.bossMaterials.push(new BossMaterial(material.name, material.boss, material.wiki, material.characters, material.region));
        }
        this.http.get("assets/json/ascension-materials.json").subscribe(data => {
          for (let material of data as any) {
            this.ascensionMaterials.push(new AscensionMaterial(material.name, material.enemies, material.wiki, material.ascensionCharacters, material.talentCharacters, material.weapons, material.drops));
          }
          this.http.get("assets/json/talent-materials.json").subscribe(data => {
            for (let material of data as any) {
              this.talentMaterials.push(new TalentMaterial(material.name, material.domain, material.wiki, material.characters, material.days, material.items));
            }
            this.http.get("assets/json/characters.json").subscribe(data => {
              for (let character of data as any) {
                const bossMaterial = this.getBossMaterialByName(character.bossMaterial);
                const weeklyBossMaterial = this.getBossMaterialByName(character.weeklyBossMaterial);
                const regionalSpecialty = this.getRegionalSpecialtyByName(character.regionalSpecialty);
                const ascensionMaterial = this.getAscensionMaterialByName(character.ascensionMaterial);
                const talentMaterial = this.getTalentMaterialByName(character.talentMaterial);

                if(bossMaterial && weeklyBossMaterial && regionalSpecialty && ascensionMaterial && talentMaterial){
                  this.characters.push(new Character(character.name, character.element, character.rarity, character.weapon,
                    regionalSpecialty, bossMaterial, ascensionMaterial, talentMaterial, weeklyBossMaterial));
                }else{
                  console.error(character.name + "has invalid params");
                  console.error("Boss Material: " + bossMaterial);
                  console.error("Weekly Boss Material: " + weeklyBossMaterial);
                  console.error("Regional Specialty: " + regionalSpecialty);
                  console.error("Ascension Material " + ascensionMaterial);
                  console.error("Talent Material: " + talentMaterial);
                }
              }
            });
          });
        });
      });
    });






  }

  public getRegionalSpecialtyByName(regionalSpecialty: string){
    for(let specialty of this.regionalSpecialties){
      if(specialty.name === regionalSpecialty) {
        return specialty;
      }
    }
    return null;
  }

  public getBossMaterialByName(bossMaterial: string) {
    for(let material of this.bossMaterials){
      if(material.name === bossMaterial) {
        return material;
      }
    }
    return null;
  }

  public getAscensionMaterialByName(ascensionMaterial: string) {
    for(let material of this.ascensionMaterials){
      if(material.name === ascensionMaterial) {
        return material;
      }
    }
    return null;
  }

  public getTalentMaterialByName(talentMaterials: string) {
    for(let material of this.talentMaterials){
      if(material.name === talentMaterials) {
        return material;
      }
    }
    return null;
  }

  public getCharacterByName(name: string) {
    //todo special case for traveler
    for(let character of this.characters){
      if(character.name === name) {
        return character;
      }
    }
    return null;
  }

  public getCharacters(){
    return this.characters;
  }

  getElementByRegion(region: string) {
    switch(region){
      case  'mondstadt':
        return 'anemo'
      case  'liyue':
        return 'geo'
      case  'inazuma':
        return 'electro'
      case  'sumeru':
        return 'dendro'
    }
    return "none";
  }
}
