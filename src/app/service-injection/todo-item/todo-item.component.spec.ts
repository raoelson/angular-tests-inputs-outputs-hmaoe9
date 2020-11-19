import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { TodoService, Todo } from '../../../../src/app/services/todo.service';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoService: jasmine.SpyObj<TodoService>;
  const todo = new Todo({ title: 'write a blog post' });

  beforeEach(async(() => {
    todoService = jasmine.createSpyObj<TodoService>('TodoService', [
      'delete', 'toggle'
    ]);

    TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ],
      providers: [
        { provide: TodoService, useValue: todoService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = todo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show todo title', () => {
    expect(
      fixture.nativeElement.querySelector('div').textContent
    ).toEqual(todo.title);
  });

  it('should strike-through title if todo is complete', () => {
    expect(fixture.nativeElement.querySelector('.complete')).toBeFalsy();
    component.todo = {...todo, complete: true };
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.complete')).toBeTruthy();
  });

  it('should delete when delete is clicked', () => {
    fixture.nativeElement.querySelector('button').click();
    expect(todoService.delete).toHaveBeenCalledWith(todo.id);
  });

  it('should toggle when toggle is clicked', () => {
    fixture.nativeElement.querySelector('input').click();
    expect(todoService.toggle).toHaveBeenCalledWith(todo.id);
  });  
});
