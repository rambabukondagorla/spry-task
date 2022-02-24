import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'
import { TodosService } from './todos/todos.service';
import { TodosComponent } from './todos/todos/todos.component';
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './postdetails/postdetails.component';
import { TodosDetailsComponent } from './todos/todosdetails/todosdetails.component';
import { InvoiceService } from './invoice.service';
import { PostService } from './post/post.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InvoiceListComponent,
    InvoiceDetailComponent,
    PostComponent,
    PostDetailsComponent,
    TodosComponent,
    TodosDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [TodosService, InvoiceService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
