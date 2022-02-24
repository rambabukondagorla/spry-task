import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostModel } from './post.model';
import { PostService } from './post.service';

@Component({
    selector: 'Post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    titleName: string = 'ADD';
    alertMessage: string;
    lstPosts: PostModel[];
    currentpage: number = 1;

    postModel = new PostModel();

    constructor(private postService: PostService, private toastrService: ToastrService) {

    }
    ngOnInit(): void {
        this.loadData();
    }
    postForm = new FormGroup({
        userId: new FormControl('', Validators.required),
        title: new FormControl('', Validators.required),
        body: new FormControl('', Validators.required),
    })
    get userId() {
        return this.postForm.get('userId');
    }
    get title() {
        return this.postForm.get('title');
    }
    get body() {
        return this.postForm.get('body');
    }
    addPost() {
        this.postModel = new PostModel();
        this.alertMessage = '';
        this.titleName = 'Add Post';

    }
    editPost(postModel: PostModel) {
        this.postModel = postModel;
        this.alertMessage = '';
        this.titleName = 'Edit Post';
    }
    deletePost(id: number) {
        if (confirm("Are you sure to delete ?")) {
            this.postService.delete(id)
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
            let index = this.lstPosts.findIndex(x => x.id == id);
            this.lstPosts.splice(index, 1);
            //this.loadData();
            this.toastrService.show('Post deleted Successfully');
        }
    }
    savePost() {
        if (this.postModel.id) {
            let id: number = this.postModel.id;
            this.postService.update(this.postModel.id, this.postModel)
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
            let index = this.lstPosts.findIndex(x => x.id == id);
            this.lstPosts[index] = this.postModel;
            this.toastrService.success('Post updated Successfully');
            //this.alertMessage = 'Post updated successfully'
        }
        else {
            this.postService.create(this.postModel).subscribe(response => {
                this.lstPosts.push(response as PostModel);
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
            this.toastrService.success('Post created Successfully');
            //this.alertMessage = 'Post created successfully'
        }
        this.postModel = new PostModel();
        this.postForm.reset();
        //this.loadData();
    }
    loadData() {
        this.postService.getAll()
            .subscribe(
                response => {
                    this.lstPosts = response;
                },
                (error: Response) => {
                    if (error.status == 404) {
                        this.toastrService.error('The Post you are searching is not-found');
                    }
                    else {
                        this.toastrService.error('Un handled exception occured ');
                    }
                }
            )

    }
}

