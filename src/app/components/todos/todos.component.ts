import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../../models/TodoItem';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todoItems: TodoItem[];
  inputTodoText: string = '';
  imageInput: string = '';

  constructor() {}

  ngOnInit(): void {
    let previousItems = sessionStorage.getItem('todoItems');

    if (previousItems) this.todoItems = JSON.parse(previousItems);
    else this.todoItems = [];
  }

  deleteItem(id: number) {
    this.todoItems = this.todoItems.filter((item, i) => i !== id);
    this.updateStorage();
  }

  addTodoItem() {
    if (this.inputTodoText) {
      this.todoItems.push({
        content: this.inputTodoText,

        image: this.imageInput,
      });
      this.inputTodoText = '';
      this.updateStorage();
    } else {
      alert('Please Enter a Task first!');
    }
  }

  updateStorage() {
    let itemsInString = JSON.stringify(this.todoItems);
    sessionStorage.setItem('todoItems', itemsInString);
  }

  getBase64(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageInput = event.target.result;
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }
}
