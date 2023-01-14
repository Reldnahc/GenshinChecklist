import {Injectable, OnInit} from '@angular/core';
import {Character} from "./genshin-data-types";
import {GenshinDataService} from "./genshin-data.service";
import {LocalStorageService} from "./local-storage.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SelectedService{
  selectables: Map<any, boolean> = new Map<any, boolean>();
  selectedSubject: Subject<Map<any, boolean>> = new Subject<Map<any, boolean>>();

  constructor(private genshinService: GenshinDataService,
              private localStorageService: LocalStorageService)
  {
    let selectables = new Map<any, boolean>(Object.entries(this.localStorageService.getObject('selected2')));
    setTimeout(() =>{
      const characters = genshinService.getCharacters();
      for(let character of characters){
        if(selectables && selectables.get(character.name)){
          this.selectables.set(character, true);
          character.selected.next(true);
        }else{
          this.selectables.set(character, false);
          character.selected.next(false);
        }
        this.selectedSubject.next(this.selectables);
      }
    },200);//todo need a way better solution

  }

  getStatus(selectable: any) {
    return this.selectables.get(selectable);
  }

  toggleCharacter(character: Character) {
    const newStatus = !this.selectables.get(character);
    this.selectables.set(character, newStatus);
    character.selected.next(newStatus);
    this.selectedSubject.next(this.selectables);
    this.localStorageService.setObject('selected2', Object.fromEntries(this.selectables));
  }
  triggerUpdate(){
    this.selectedSubject.next(this.selectables);
  }
  getAllSelected(){
    let selected = [];
    for(let [selectable, value] of this.selectables){
      if(value){
        selected.push(selectable);
      }
    }
    return selected;
  }

}
