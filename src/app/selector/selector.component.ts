import { Component, OnInit } from '@angular/core';
import {GenshinDataService} from "../genshin-data.service";
import {Character} from "../genshin-data-types";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  readonly characters: Character[];
  status: boolean = false;

  constructor(private genshinDataService: GenshinDataService) {
    this.characters = genshinDataService.getCharacters();
  }

  ngOnInit(): void {


  }

}
