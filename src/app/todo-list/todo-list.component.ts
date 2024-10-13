import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  title: string;
  description?: string;
  price?: number;
  completed: boolean;
};


@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  imports: [CommonModule, FormsModule]
})
export class TodoListComponent implements OnInit {

  todos: TodoItem[] = [];
  newTodoTitle = '';
  newTodoDescription = '';
  newTodoPrice?: number;

  ngOnInit(): void {
    const storedTodos = localStorage.getItem('webtodos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    };
  };

  addTodo() {
    if (this.newTodoTitle.trim()) {
      const newTodo: TodoItem = {
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        price: this.newTodoPrice || 0,
        completed: false
      };
      this.todos.push(newTodo);
      this.saveTodos();
      this.resetForm();
    };
  };

  removeTodo(index: number) {
    this.todos.splice(index, 1); 
    this.saveTodos();
  };

  toggleCompletion(index: number) {
    this.todos = this.todos.map((todo, item) =>
      item === index ? { ...todo, completed: !todo.completed } : todo
    );

    this.saveTodos();
  };

  getTotalPrice(): number {
    return this.todos.reduce((sum, todo) => {
      return todo.completed ? sum + (todo.price || 0) : sum;
    }, 0);
  };

  saveTodos() {
    localStorage.setItem('webtodos', JSON.stringify(this.todos));
  };

  resetForm() {
    this.newTodoTitle = '';
    this.newTodoDescription = '';
    this.newTodoPrice = 0;
  };

};


