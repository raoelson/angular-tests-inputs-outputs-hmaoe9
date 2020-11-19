import { Component } from '@angular/core';
import { TodoService } from '../../../../src/app/services/todo.service';

@Component({
  selector: 'ex1-add-todo',
  template: `
  <div class="form">
    <input id="title" [(ngModel)]="title" #control="ngModel" required>
    <button (click)="addTodo()">Create</button>
  </div>
  <div class="error"
    *ngIf="control.invalid && (control.dirty || control.touched)">
    Must enter a title
  </div>
  `,
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {
  title: string;

  constructor(private todoService: TodoService) { }

  addTodo() {
    if (this.title) {
      this.todoService.add(this.title);
    }
  }
}
