import { Component, OnInit } from '@angular/core';
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-config-reset',
  templateUrl: './config-reset.component.html',
  styleUrls: ['./config-reset.component.css']
})
export class ConfigResetComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {

  }

  resetTodoList() {
    this.todoService.resetChecklist();
  }
}
