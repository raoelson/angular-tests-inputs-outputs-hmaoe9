import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/proxy';
import 'zone.js/dist/jasmine-patch';
import './src/app/service-injection/add-todo/add-todo.component.spec';
import './src/app/service-injection/todo-container/todo-container.component.spec';
import './src/app/service-injection/todo-item/todo-item.component.spec';
import './src/app/inputs-outputs/add-todo/add-todo.component.spec';
import './src/app/inputs-outputs/todo-container/todo-container.component.spec';
import './src/app/inputs-outputs/todo-item/todo-item.component.spec';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

getTestBed().resetTestEnvironment();

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
