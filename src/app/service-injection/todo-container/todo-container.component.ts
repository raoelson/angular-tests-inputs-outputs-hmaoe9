import { TodoService } from '../../../../src/app/services/todo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'ex1-todo-container',
  template: `
  <h4>Solution 1. Injecting Services into Child Components</h4>
    <ex1-todo-item *ngFor="let todo of todoService.todos$() | async"
    [todo]="todo"
    ></ex1-todo-item>
    <ex1-add-todo></ex1-add-todo>
  `,
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent {
  constructor(public todoService: TodoService) { }
}
