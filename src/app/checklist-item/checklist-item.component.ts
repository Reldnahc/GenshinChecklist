import {Component, Input, OnInit} from '@angular/core';
import {AscensionMaterial, BossMaterial, Material, RegionalSpecialty, TalentMaterial} from "../genshin-data-types";
import {GenshinDataService} from "../genshin-data.service";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.css']
})
export class ChecklistItemComponent implements OnInit {
  @Input() item!: any;
  img!: string;
  count!: number;
  domain!: string;
  days!: string[];
  variants!: string[];
  boss!: string;
  region!: string;
  wiki!: string;
  regionElement!: string;

  constructor(private genshinService: GenshinDataService,
              private todoService: TodoService) { }

  ngOnInit(): void {
    this.count = this.item[1];
    this.item = this.item[0];
    this.wiki = this.item.wiki;

    if(this.item.constructor == TalentMaterial){
      this.img = this.item.items.uncommon.replaceAll(' ','_').replaceAll('\'','');
      this.domain = this.item.domain;
      this.days = this.item.days;
      this.variants = [];
      this.variants.push(this.item.items.uncommon);
      this.variants.push(this.item.items.rare);
      this.variants.push(this.item.items.epic);

    }else if(this.item.constructor == AscensionMaterial){
      this.img = this.item.drops.common.replaceAll(' ','_').replaceAll('\'','');
      this.variants = [];
      this.variants.push(this.item.drops.common);
      this.variants.push(this.item.drops.uncommon);
      this.variants.push(this.item.drops.rare);
    }else if(this.item.constructor == RegionalSpecialty){
      this.img = this.item.name.replaceAll(' ','_').replaceAll('\'','');

      this.region = this.item.region;
      this.regionElement = this.genshinService.getElementByRegion(this.region);
    }else if(this.item.constructor == BossMaterial){
      this.img = this.item.name.replaceAll(' ','_').replaceAll('\'','');

      this.boss = this.item.boss;
      this.region = this.item.region;
      this.regionElement = this.genshinService.getElementByRegion(this.region);
    }else{
      this.img = this.item.name.replaceAll(' ','_').replaceAll('\'','');
    }
  }

  markComplete(){
    this.todoService.markItemAsComplete(this.item);
  }

  unmarkComplete() {
    this.todoService.unmarkItemAsComplete(this.item.name);

  }
  markSnooze(){
    this.todoService.markItemAsSnooze(this.item.name);
  }

  unmarkSnooze() {
    this.todoService.unmarkItemAsSnooze(this.item.name);
  }

}
