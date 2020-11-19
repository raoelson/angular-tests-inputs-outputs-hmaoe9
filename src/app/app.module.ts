import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoContainerComponent as Ex1TodoContainer } from './service-injection/todo-container/todo-container.component';
import { TodoItemComponent as Ex1TodoItem } from './service-injection/todo-item/todo-item.component';
import { AddTodoComponent as Ex1AddTodo } from './service-injection/add-todo/add-todo.component';
import { TodoContainerComponent as Ex2TodoContainer } from './inputs-outputs/todo-container/todo-container.component';
import { TodoItemComponent as Ex2Todo } from './inputs-outputs/todo-item/todo-item.component';
import { AddTodoComponent as Ex2AddTodo } from './inputs-outputs/add-todo/add-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    Ex1TodoContainer, Ex1TodoItem, Ex1AddTodo,
    Ex2TodoContainer, Ex2Todo, Ex2AddTodo
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
