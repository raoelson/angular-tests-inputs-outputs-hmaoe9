import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ex2-add-todo',
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
  @Output() create: EventEmitter<string> = new EventEmitter();

  addTodo() {
    if (this.title) {
      this.create.emit(this.title);
    }
  }
}

