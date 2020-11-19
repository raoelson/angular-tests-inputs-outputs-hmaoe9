import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoContainerComponent } from './todo-container.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { MockComponent} from 'ng-mocks';
import { TodoService, Todo } from '../../../../src/app/services/todo.service';
import { AddTodoComponent } from '../add-todo/add-todo.component';

describe('TodoContainerComponent', () => {
  let component: TodoContainerComponent;
  let fixture: ComponentFixture<TodoContainerComponent>;
  let todoService: jasmine.SpyObj<TodoService>;
  const todos = [
    new Todo({ id: 1, title: 'write a blog post' }),
    new Todo({ id: 2, title: 'go to gym' }),
  ];
  let todos$: BehaviorSubject<Todo[]>;

  beforeEach(async(() => {
    todoService = jasmine.createSpyObj<TodoService>('TodoService', [
      'todos$'
    ]);
    todos$ = new BehaviorSubject<Todo[]>(todos);
    todoService.todos$.and.returnValue(todos$);

    TestBed.configureTestingModule({
      declarations: [
        TodoContainerComponent,
        MockComponent(TodoItemComponent),
        MockComponent(AddTodoComponent) ],
      providers: [
        { provide: TodoService, useValue: todoService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show each todo', () => {
    expect(getTodos().length).toEqual(todos.length);
  });

  it('should show updated todos if todos change', () => {
    todos$.next([]);
    fixture.detectChanges();
    expect(getTodos().length).toEqual(0);
  });

  it('should pass id to todo', () => {
    const todoComponents = getTodos();
    todoComponents.forEach((c, index) =>
      expect(c.todo.id).toEqual(todos[index].id));
  });

  function getTodos(): TodoItemComponent[] {
    return fixture.debugElement.queryAll(
      By.directive(TodoItemComponent)).map(
      c => c.componentInstance
    );
  }
});
