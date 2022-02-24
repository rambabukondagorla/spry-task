import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './postdetails/postdetails.component';
import { TodosComponent } from './todos/todos/todos.component';
import { TodosDetailsComponent } from './todos/todosdetails/todosdetails.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'invoice-list/:id',
    component: InvoiceDetailComponent
  },
  {
    path: 'invoice-list',
    component: InvoiceListComponent
  },
  {
    path: 'postdetails/:id',
    component: PostDetailsComponent
  },
  {
    path: 'post',
    component: PostComponent
  },
  {
    path: 'todo/:id',
    component: TodosDetailsComponent
  },
  {
    path: 'todo',
    component: TodosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
