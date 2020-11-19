import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show error initially', () => {
    expect(getError()).toBeFalsy();
  });

  it('should show error if form is blurred and no text is entered', () => {
    getInput().dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(getError()).toBeTruthy();
  });

  it('should not show error if form is blurred and text is entered', () => {
    updateInput('new todo');
    getInput().dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(getError()).toBeFalsy();
  });

  it('should update the title when input is changed', () => {
    updateInput('new todo');
    expect(component.title).toEqual('new todo');
  });

  it('should not add todo if title is empty', () => {
    const createSpy = spyOn(component.create, 'emit');
    getAddButton().click();
    expect(createSpy).not.toHaveBeenCalled();
  });

  it('should add todo with title when Add is clicked', () => {
    const createSpy = spyOn(component.create, 'emit');
    updateInput('new todo');
    getAddButton().click();
    expect(createSpy).toHaveBeenCalledWith('new todo');
  });

  function updateInput(value) {
    getInput().value = value;
    getInput().dispatchEvent(new Event('input'));
  }

  function getInput(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  function getError(): HTMLElement {
    return fixture.nativeElement.querySelector('.error');
  }

  function getAddButton(): HTMLElement {
    return fixture.nativeElement.querySelector('button');
  }
});
