import { TodoService } from '../../../../src/app/services/todo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'ex2-todo-container',
  template: `
    <h4>Solution 2. Pure Child Components</h4>
    <ex2-todo-item *ngFor="let todo of todoService.todos$() | async"
    [todo]="todo" (delete)="handleDelete(todo.id)"
    (toggle)="handleToggle(todo.id)"
    ></ex2-todo-item>
    <ex2-add-todo (create)="handleCreate($event)"></ex2-add-todo>
  `,
  styleUrls: ['./todo-container.component.css']
})
export class TodoContainerComponent {

  constructor(public todoService: TodoService) { }

  handleDelete(id) {
    this.todoService.delete(id);
  }

  handleToggle(id) {
    this.todoService.toggle(id);
  }

  handleCreate(title) {
    this.todoService.add(title);
  }
}
