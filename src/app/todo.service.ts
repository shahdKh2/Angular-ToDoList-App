import { Injectable } from '@angular/core';

export interface Todo {
  title: string;
  id: number;
  isComplete: boolean;
}

@Injectable({
  providedIn: 'root'
})

// =================================
export class TodoService {
  private todos: Todo[] = []; // -- holds the todos..
  private storageKey = 'todos';


  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  private getTasksFromStorage(): Todo[] {
    if (this.isBrowser()) {
      const todosJson = localStorage.getItem(this.storageKey);
      return todosJson ? JSON.parse(todosJson) : [];
    }
    return [];
  }

  private saveTasksToStorage(todos: Todo[]): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.storageKey, JSON.stringify(todos));
    }
  }

  getTask(): Todo[] {
    return this.getTasksFromStorage();
  }

  addTask(title: string, id: number): void {
    const todos = this.getTasksFromStorage();
    todos.push({ title, id, isComplete: false });
    this.saveTasksToStorage(todos);
  }

  deleteTask(index: number): void {
    const todos = this.getTasksFromStorage();
    todos.splice(index, 1);
    this.saveTasksToStorage(todos);
  }

  setCompletionStatus(i: number): void {
    const todos = this.getTasksFromStorage();
    todos[i].isComplete = !todos[i].isComplete;  //completion status
    this.saveTasksToStorage(todos);
  }

  searchTasks(query: string): Todo[] {
    const todos = this.getTasksFromStorage();
    return todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

}
