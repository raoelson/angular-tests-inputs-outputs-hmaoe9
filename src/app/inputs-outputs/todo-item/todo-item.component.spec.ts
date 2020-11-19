import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../../../../src/app/services/todo.service';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  const todo = new Todo({ title: 'write a blog post' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ],
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

  it('should emit delete when delete is clicked', () => {
    const deleteSpy = spyOn(component.delete, 'emit');
    fixture.nativeElement.querySelector('button').click();
    expect(deleteSpy).toHaveBeenCalled();
  });

  it('should emit toggle when toggle is clicked', () => {
    const toggleSpy = spyOn(component.toggle, 'emit');
    fixture.nativeElement.querySelector('input').click();
    expect(toggleSpy).toHaveBeenCalled();
  });
});
