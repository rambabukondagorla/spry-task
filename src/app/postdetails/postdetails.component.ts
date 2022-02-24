import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../post/post.model';
import { PostService } from '../post/post.service';


@Component({
    selector: 'postdetails',
    templateUrl: './postdetails.component.html',
    styleUrls: ['./postdetails.component.css']
})
export class PostDetailsComponent implements OnInit {
    postModel = new PostModel();
    constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }

    ngOnInit(): void {
        let strId = this.activatedRoute.snapshot.paramMap.get('id');
        let id = strId ? parseInt(strId) : 0;

        this.postService.getById(id).subscribe(response => {
            this.postModel = response;
        })
    }
}
