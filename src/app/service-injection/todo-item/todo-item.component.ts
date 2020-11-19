import { Todo, TodoService } from '../../services/todo.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ex1-todo-item',
  template: `
  <div class="title" [class.complete]="todo.complete">{{todo.title}}</div>
  <input type="checkbox" (click)="toggle()" [checked]="todo.complete">
  <button (click)="delete()">Delete</button>
  `,
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: Todo;

  constructor(private todoService: TodoService) { }

  delete() {
    this.todoService.delete(this.todo.id);
  }

  toggle() {
    this.todoService.toggle(this.todo.id);
  }
}
