import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TodosModel } from '../todos.model';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  titleName: string = 'ADD';
  alertMessage: string;
  lstTodos: TodosModel[];
  currentpage: number = 1;

  todosModel = new TodosModel();

  constructor(private todosService: TodosService, private toastrService: ToastrService) {

  }
  ngOnInit(): void {
    this.loadData();
  }
  todosForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    completed: new FormControl('', Validators.required),
  })
  get userId() {
    return this.todosForm.get('userId');
  }
  get title() {
    return this.todosForm.get('title');
  }
  get completed() {
    return this.todosForm.get('completed');
  }
  addTodos() {
    this.todosModel = new TodosModel();
    this.alertMessage = '';
    this.titleName = 'Add Todo';

  }
  editTodos(todosModel: TodosModel) {
    this.todosModel = todosModel;
    this.alertMessage = '';
    this.titleName = 'Edit Todo';
  }
  deleteTodos(id: number) {
    if (confirm("Are you sure to delete ?")) {
      this.todosService.delete(id)
        .subscribe(
          response => {
            console.log(response);
          },
          (error: Response) => {
            if (error.status == 404) {
              this.toastrService.error('The resource you are trying to delete is not-found');
            }
            else {
              this.toastrService.error('Un handled error occured');
            }
          }
        );
      let index = this.lstTodos.findIndex(x => x.id == id);
      this.lstTodos.splice(index, 1);
      //this.loadData();
      this.toastrService.show('Todo deleted Successfully');
    }
  }
  saveTodos() {
    if (this.todosModel.id) {
      let id: number = this.todosModel.id;
      this.todosService.update(this.todosModel.id, this.todosModel)
        .subscribe(response => {

        },
          (error: Response) => {
            if (error.status == 404) {
              this.toastrService.error('The resource you are searching to updete is not-found');
            }
            else {
              this.toastrService.error('Un handled exception occured');
            }
          }
        )
      let index = this.lstTodos.findIndex(x => x.id == id);
      this.lstTodos[index] = this.todosModel;
      this.toastrService.success('Todo updated Successfully');
      //this.alertMessage = 'Post updated successfully'
    }
    else {
      this.todosService.create(this.todosModel).subscribe(response => {
        this.lstTodos.push(response as TodosModel);
      },
        (error: Response) => {

          if (error.status == 400) {
            this.toastrService.error('Bad input');
          }
          else if (error.status == 401) {
            this.toastrService.error('Un authorized')
          }
          else {
            this.toastrService.error('Un handled exception occured');
          }
        }
      );
      this.toastrService.success('Todo created Successfully');
      //this.alertMessage = 'Post created successfully'
    }
    this.todosModel = new TodosModel();
    this.todosForm.reset();
    //this.loadData();
  }
  loadData() {
    this.todosService.getAll()
      .subscribe(
        response => {
          this.lstTodos = response;
        },
        (error: Response) => {
          if (error.status == 404) {
            this.toastrService.error('The Todos you are searching is not-found');
          }
          else {
            this.toastrService.error('Un handled exception occured ');
          }
        }
      )

  }
}



