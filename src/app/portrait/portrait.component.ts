import {Component, Input, OnInit} from '@angular/core';
import {AscensionMaterial, BossMaterial, Character, RegionalSpecialty} from "../genshin-data-types";
import {SelectedService} from "../selected.service";

@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.css']
})
export class PortraitComponent implements OnInit {

  @Input() character!: Character;
  gem!: String;
  regionalSpecialty!: string;
  ascensionMaterial!: string;
  bossMaterial!: string;
  talentMaterial!: string;
  weeklyBossMaterial!: string;
  status: boolean | undefined;
  private _subscription: any;

  constructor(private selectedService: SelectedService) {

  }

  ngOnInit(): void {
    if(this.character){
      switch(this.character.element){
        case "geo":
          this.gem = "prithiva_topaz_fragment"
          break;
        case "cryo":
          this.gem = "shivada_jade_fragment"
          break;
        case "dendro":
          this.gem = "nagadus_emerald_fragment"
          break;
        case "electro":
          this.gem = "vajrada_amethyst_fragment"
          break;
        case "anemo":
          this.gem = "vayuda_turquoise_fragment"
          break;
        case "hydro":
          this.gem = "varunada_lazurite_fragment"
          break;
        case "pyro":
          this.gem = "agnidus_agate_fragment"
          break;
      }

      this.regionalSpecialty = this.character.regionalSpecialty.toString().replace(/ /g,"_").replace(/'/g,"");
      this.ascensionMaterial = this.character.ascensionMaterial.drops.common.replace(/ /g,"_").replace(/'/g,"");
      this.bossMaterial = this.character.bossMaterial.toString().replace(/ /g,"_").replace(/'/g,"");
      this.talentMaterial = this.character.talentMaterial.items.uncommon.replace(/ /g,"_").replace(/'/g,"");
      this.weeklyBossMaterial = this.character.weeklyBossMaterial.toString().replace(/ /g,"_").replace(/'/g,"");

      this._subscription = this.character.selected.subscribe((value) => {
        this.status = value;
      });

      this.status = this.selectedService.getStatus(this.character);

    }//end character setup
  }



  toggle() {
    this.selectedService.toggleCharacter(this.character);
  }
}
