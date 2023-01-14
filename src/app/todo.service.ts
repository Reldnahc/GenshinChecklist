import { Injectable } from '@angular/core';
import {SelectedService} from "./selected.service";
import {Character, Material, RegionalSpecialty, TalentMaterial} from "./genshin-data-types";
import {Subject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  items: Map<Material, number> = new Map<Material, number>();
  itemsSubject: Subject<any> = new Subject<any>();

  itemsMarkedDone: string[] = [];
  itemsMarkedSnooze: string[] = [];
  itemsUnavailable: string[] = [];

  constructor(private selectedService: SelectedService,
              private localStorageService: LocalStorageService) {
    this.itemsMarkedDone = localStorageService.getObject('checklistComplete');
    if(!this.itemsMarkedDone){
      this.itemsMarkedDone = [];
    }
    for(let i = this.itemsMarkedDone.length - 1; i >= 0; i--){
      const resetTime = this.localStorageService.getItem(this.itemsMarkedDone[i] + 'ResetTime');
      const timeNow = new Date().getTime() / 1000;
      if(timeNow >= resetTime){
        this.itemsMarkedDone.splice(this.itemsMarkedDone.indexOf(this.itemsMarkedDone[i]),1);
      }
    }

    this.itemsMarkedSnooze = localStorageService.getObject('checklistSnooze');
    if(!this.itemsMarkedSnooze){
      this.itemsMarkedSnooze = [];
    }
    selectedService.selectedSubject.subscribe((map) => {
      this.items = new Map<Material, number>()
      for(let [key, selected] of map ){
        if(selected){
          if(key.constructor == Character){

            this.items.set(key.weeklyBossMaterial, (this.items.get(key.weeklyBossMaterial) || 0) + 1);
            this.items.set(key.talentMaterial, (this.items.get(key.talentMaterial) || 0) + 1);
            this.items.set(key.regionalSpecialty, (this.items.get(key.regionalSpecialty) || 0) + 1);
            this.items.set(key.ascensionMaterial, (this.items.get(key.ascensionMaterial) || 0) + 1);
            this.items.set(key.bossMaterial, (this.items.get(key.bossMaterial) || 0) + 1);
           // this.items.set(key.element,);

          }
        }
      }

      for(let [item, count] of this.items){
        if(item.constructor == TalentMaterial){
          const convertedDayArray = TodoService.convertDayStringToInt((item as TalentMaterial).days);
          if(convertedDayArray.includes(new Date().getDay())){
            this.itemsUnavailable.push((item as TalentMaterial).name);
          }
        }
        if(this.itemsUnavailable.includes(item.name)){
          this.items.set(item,-3);
        }else if(this.itemsMarkedSnooze.includes(item.name)){
          this.items.set(item,-2);
        }else if(this.itemsMarkedDone.includes(item.name)){
          this.items.set(item,-1);
        }
      }
      this.itemsSubject.next([...this.items.entries()].sort((a, b) => b[1] - a[1]));
    });
  }

  markItemAsComplete(itemName: Material){
    this.itemsMarkedDone.push(itemName.name);
    this.selectedService.triggerUpdate();
    this.localStorageService.setObject('checklistComplete',this.itemsMarkedDone);


    const timeNow = new Date().getTime() / 1000;
    let timeReset = new Date().setHours(4,0,0,0) / 1000;//todo set up server select do this all in utc
    if(timeReset < timeNow){
      timeReset = (new Date().setHours(4, 0,0,0) / 1000) + 86400;//todo set up server select do this all in utc
    }

    if(itemName.constructor == RegionalSpecialty){
      timeReset += 86400;
    }

    this.localStorageService.setItem(itemName.name + 'ResetTime',timeReset);
  }

  unmarkItemAsComplete(itemName: string){
    this.itemsMarkedDone.splice(this.itemsMarkedDone.indexOf(itemName),1);
    this.selectedService.triggerUpdate();
    this.localStorageService.setObject('checklistComplete',this.itemsMarkedDone);
    this.localStorageService.setItem(itemName + 'ResetTime', -1);
  }
  markItemAsSnooze(itemName: string){
    this.itemsMarkedSnooze.push(itemName);
    this.selectedService.triggerUpdate();
    this.localStorageService.setObject('checklistSnooze',this.itemsMarkedSnooze);

  }
  unmarkItemAsSnooze(itemName: string){
    this.itemsMarkedSnooze.splice(this.itemsMarkedDone.indexOf(itemName),1);
    this.selectedService.triggerUpdate();
    this.localStorageService.setObject('checklistSnooze',this.itemsMarkedSnooze);
  }

  resetChecklist(resetSnooze: boolean = false){
    if(resetSnooze){
      this.itemsMarkedSnooze = [];
      this.localStorageService.setObject('checklistSnooze',this.itemsMarkedSnooze);
    }
    this.itemsMarkedDone = [];
    this.localStorageService.setObject('checklistComplete',this.itemsMarkedDone);
    this.selectedService.triggerUpdate();
  }

  private static convertDayStringToInt(days: string[]): number[] {

    let newArray: number[] = []

    for(const day of days){
      switch (day){
        case 'sunday':
          newArray.push(0);
          break;
        case 'monday':
          newArray.push(1);
          break;
        case 'tuesday':
          newArray.push(2);
          break;
        case 'wednesday':
          newArray.push(3);
          break;
        case 'thursday':
          newArray.push(4);
          break;
        case 'friday':
          newArray.push(5);
          break;
        case 'saturday':
          newArray.push(6);
          break;
      }
    }

    return newArray;
  }
}

