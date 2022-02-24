import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosModel } from '../todos.model';
import { TodosService } from '../todos.service';



@Component({
    selector: 'todosdetails',
    templateUrl: './todosdetails.component.html',
    styleUrls: ['./todosdetails.component.css']
})
export class TodosDetailsComponent implements OnInit {
    todosModel = new TodosModel();
    constructor(private activatedRoute: ActivatedRoute, private todosService: TodosService) { }

    ngOnInit(): void {
        let strId = this.activatedRoute.snapshot.paramMap.get('id');
        let id = strId ? parseInt(strId) : 0;
        this.todosService.getById(id).subscribe((response) => {
            this.todosModel = response;
        })
    }

}