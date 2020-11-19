/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TodoService } from './todo.service';

describe('Service: Todo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService]
    });
  });

  it('should create', inject([TodoService], (service: TodoService) => {
    expect(service).toBeTruthy();
  }));

  it('should return todo', inject([TodoService], (service: TodoService) => {
    expect(service.todo(1)).toBeTruthy();
  }));

  it('should return todos', inject([TodoService], (service: TodoService) => {
    expect(service.todos().length).toEqual(3);
  }));

  it('should return a copy of todos', inject([TodoService], (service: TodoService) => {
    const todos = service.todos();
    todos.push({ id: 5, title: '', complete: false });
    expect(service.todos().length).toEqual(todos.length - 1);
  }));

  it('should return a deep copy of todos', inject([TodoService], (service: TodoService) => {
    service.todo(1).title = 'new title';
    expect(service.todo(1).title).not.toEqual('new title');
  }));

  it('should delete an item', inject([TodoService], (service: TodoService) => {
    const todos = service.todos();
    service.delete(1);
    expect(service.todos().length).toEqual(todos.length - 1);
  }));
});
