import { AddTodoComponent } from './../add-todo/add-todo.component';
import { BehaviorSubject } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoContainerComponent } from './todo-container.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { MockComponent} from 'ng-mocks';
import { TodoService, Todo } from '../../../app/services/todo.service';

describe('TodoContainerComponent', () => {
  let component: TodoContainerComponent;
  let fixture: ComponentFixture<TodoContainerComponent>;
  let todoService: jasmine.SpyObj<TodoService>;
  const todos = [
    new Todo({ id: 1, title: 'write a blog post' }),
    new Todo({ id: 2, title: 'go to gym' }),
  ];
  let todos$;

  beforeEach(async(() => {
    todoService = jasmine.createSpyObj<TodoService>('TodoService', [
      'todos$', 'add', 'delete', 'toggle'
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

  it('should show updated todos if todo is deleted', () => {
    todos$.next([]);
    fixture.detectChanges();
    expect(getTodos().length).toEqual(0);
  });

  it('should pass id to todo', () => {
    const todoComponents = getTodos();
    todoComponents.forEach((c, index) => expect(c.todo.id).toEqual(todos[index].id));
  });

  it('should delete if delete is emitted from TodoComponent', () => {
    getTodos()[0].delete.emit();
    expect(todoService.delete).toHaveBeenCalledWith(getTodos()[0].todo.id);
  });

  it('should toggle if toggle is emitted from TodoComponent', () => {
    getTodos()[0].toggle.emit();
    expect(todoService.toggle).toHaveBeenCalledWith(getTodos()[0].todo.id);
  });

  it('should add if create is emitted from AddTodoComponent', () => {
    getAddTodoComponent().create.emit('title');
    expect(todoService.add).toHaveBeenCalledWith('title');
  });

  function getTodos(): TodoItemComponent[] {
    return fixture.debugElement.queryAll(By.directive(TodoItemComponent)).map(
      c => c.componentInstance
    );
  }

  function getAddTodoComponent(): AddTodoComponent {
    return fixture.debugElement.query(
      By.directive(AddTodoComponent)).componentInstance;
  }
});
