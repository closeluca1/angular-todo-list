import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { FormsModule } from '@angular/forms'; // Adicione o FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListComponent, FormsModule],
  template: `<app-todo-list></app-todo-list>`,
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-list';
}
