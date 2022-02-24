import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TodosModel } from "./todos.model";

@Injectable()

export class TodosService {
    private readonly apiBaseUrl: string = 'https://jsonplaceholder.typicode.com/todos';

    constructor(private httpClient: HttpClient) {

    }
    getAll() {
        return this.httpClient.get<TodosModel[]>(this.apiBaseUrl);
    }
    create(todosModel: TodosModel) {
        return this.httpClient.post(this.apiBaseUrl, todosModel);
    }
    update(id: number, todosModel: TodosModel) {
        let url: string = this.apiBaseUrl + '/' + id;
        return this.httpClient.put(url, todosModel);
    }
    delete(id: number) {
        let url: string = this.apiBaseUrl + '/' + id;
        return this.httpClient.delete(url);
    }
    getById(id: number) {
        let url: string = this.apiBaseUrl + '/' + id;
        return this.httpClient.get<TodosModel>(url);
    }
}