import { Component, OnInit } from '@angular/core'; 
import { User } from '../_models/user.model';
import { PostService } from '../_services/post.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser?: User;
  posts: any;

  constructor(private userService: UserService,
              private postService: PostService) { }

  ngOnInit(): void { 
    this.userService.getUserByID(1).subscribe({
      next: data => { 
        this.currentUser = data.data;   
        this.postService.getAllJobPostsByUserID(this.currentUser?.id, 1, 6).subscribe({

          next: data => {
            this.posts = data.data.content;
            console.log(this.posts);
          },
          error: err => {
            console.log('post: ' + err);
          }
        })
      },
      error: err => {
        console.log('user: ' + err);
      }

    });
     
    // this.postService.getAllJobPostsByUserID(1).subscribe({

    //   next: data => {
    //     this.posts = data.data.content;
    //     console.log(this.posts);
    //   },
    //   error: err => {
    //     console.log('post: ' + err);
    //   }
    // })

  }

}
