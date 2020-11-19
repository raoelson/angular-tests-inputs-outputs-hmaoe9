import { Todo } from '../../services/todo.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ex2-todo-item',
  template: `
  <div class="title" [class.complete]="todo.complete">{{todo.title}}</div>
  <input type="checkbox" (click)="onToggle()" [checked]="todo.complete">
  <button (click)="onDelete()">Delete</button>
  `,
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() toggle: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onDelete() {
    this.delete.emit();
  }

  onToggle() {
    this.toggle.emit();
  }
}
