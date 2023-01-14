import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SelectorComponent } from './selector/selector.component';
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResourceAccordionComponent } from './resource-accordion/resource-accordion.component';
import { ConfigCollapseComponent } from './config-collapse/config-collapse.component';
import { ChecklistComponent } from './checklist/checklist.component';
import {PortraitComponent} from "./portrait/portrait.component";
import { ChecklistItemComponent } from './checklist-item/checklist-item.component';
import {GenshinDataService} from "./genshin-data.service";
import { ConfigResetComponent } from './config-reset/config-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    ResourceAccordionComponent,
    ConfigCollapseComponent,
    ChecklistComponent,
    PortraitComponent,
    ChecklistItemComponent,
    ConfigResetComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
