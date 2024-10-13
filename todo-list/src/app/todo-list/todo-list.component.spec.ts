import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TodoListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar com uma lista vazia', () => {
    expect(component.todos.length).toBe(0);
  });

  it('deve adicionar um novo todo', () => {
    component.newTodoTitle = 'óleo';
    component.newTodoDescription = '';
    component.newTodoPrice = 6.15;
    component.addTodo();

    expect(component.todos.length).toBe(1);
    expect(component.todos[0].title).toBe('óleo');
    expect(component.todos[0].description).toBe('');
    expect(component.todos[0].price).toBe(6.15);
    expect(component.todos[0].completed).toBeFalse();
  });

  it('deve remover um todo', () => {
    component.todos = [
      { title: 'óleo', description: '', price: 6.15, completed: false },
    ];

    component.removeTodo(0);
    expect(component.todos.length).toBe(0); 
  });

  it('deve alternar o estado de conclusão de um todo', () => {
    component.todos = [
      { title: 'óleo', description: '', price: 6.15, completed: false }
    ];

    component.toggleCompletion(0);
    expect(component.todos[0].completed).toBeTrue();

    component.toggleCompletion(0);
    expect(component.todos[0].completed).toBeFalse();
  });

  it('deve resetar os campos do formulário', () => {
    component.newTodoTitle = 'óleo';
    component.newTodoDescription = '';
    component.newTodoPrice = 6.15;

    component.resetForm();

    expect(component.newTodoTitle).toBe('');
    expect(component.newTodoDescription).toBe('');
    expect(component.newTodoPrice).toBe(0);
  });

  it('deve salvar no localStorage', () => {
    const spy = spyOn(localStorage, 'setItem');
    component.todos = [
      { title: 'óleo', description: '', price: 6.15, completed: false }
    ];
    component.saveTodos();

    expect(spy).toHaveBeenCalledWith('webtodos', JSON.stringify(component.todos));
  });

  it('deve carregar as informações do localStorage', () => {
    const mockTodos = JSON.stringify([
      { title: 'óleo', description: '', price: 6.15, completed: true }
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(mockTodos);

    component.ngOnInit();

    expect(component.todos.length).toBe(1);
    expect(component.todos[0].title).toBe('óleo');
    expect(component.todos[0].completed).toBeTrue();
  });
});
