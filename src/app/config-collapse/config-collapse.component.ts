import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../local-storage.service";

@Component({
  selector: 'app-config-collapse',
  templateUrl: './config-collapse.component.html',
  styleUrls: ['./config-collapse.component.css']
})
export class ConfigCollapseComponent implements OnInit {
  public isCollapsed = false;
  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.isCollapsed = this.localStorageService.getBool('config-collapsed');
  }

  onClick(){
    this.isCollapsed = !this.isCollapsed;
    this.localStorageService.setBool('config-collapsed',this.isCollapsed);
  }
}
