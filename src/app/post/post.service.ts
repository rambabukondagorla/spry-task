import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PostModel } from "./post.model";

@Injectable()

export class PostService {
    private readonly apiBaseUrl: string = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private httpClient: HttpClient) {

    }
    getAll() {
        return this.httpClient.get<PostModel[]>(this.apiBaseUrl);
    }
    create(postModel: PostModel) {
        return this.httpClient.post(this.apiBaseUrl, postModel);
    }
    update(id: number, postModel: PostModel) {
        let url: string = this.apiBaseUrl + '/' + id;
        return this.httpClient.put(url, postModel);
    }
    delete(id: number) {
        let url: string = this.apiBaseUrl + '/' + id;
        return this.httpClient.delete(url);
    }
    getById(id: number) {
        let url: string = this.apiBaseUrl + '/' + id;
        return this.httpClient.get<PostModel>(url);
    }
}