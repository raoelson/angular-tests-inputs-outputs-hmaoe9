import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos: Todo[] = [
    { id: 1, title: 'write a blog post', complete: false },
    { id: 2, title: 'go to gym', complete: false },
    { id: 3, title: 'get some work done', complete: false }
  ];

  private _todos$: BehaviorSubject<Todo[]> = new BehaviorSubject(this._todos);

  constructor() { }

  todo(id) {
    return new Todo(this._todos.find(t => t.id === id));
  }

  todos() {
    return this._todos$.value.map(todo => new Todo(todo));
  }

  todos$() {
    return this._todos$.asObservable();
  }

  delete(id) {
    this._todos = this.todos().filter(t => t.id !== id);
    this._todos$.next(this._todos);
  }

  add(title: string) {
    const id = Math.max(...this._todos$.value.map(t => t.id)) + 1;
    this._todos$.next([...this._todos$.value, new Todo({ id, title})]);
  }

  toggle(id) {
    const todos = this.todos();
    const todo = todos.find(t => t.id === id);
    todo.complete = !todo.complete;
    this._todos$.next(todos);
  }
}

export class Todo {
  id: number;
  title: string;
  complete: boolean;

  constructor(init?: Partial<Todo>) {
    Object.assign(this, init);
  }
}
