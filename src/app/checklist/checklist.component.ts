import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  items: any;

  showTodo: boolean = true;
  showCompleted: boolean = true;
  showSnoozed: boolean = true;
  showUnavailable: boolean = true;

  constructor(private todoService: TodoService) {


  }

  ngOnInit(): void {
    this.todoService.itemsSubject.subscribe((map) => {
      this.items = map;
    });
  }
}
