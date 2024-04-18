import { Component, OnInit, computed, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  providers: [PostsService],
})
export class PostListComponent implements OnInit {
  postService = inject(PostsService);

  public posts = computed(() => this.postService.postList);

  ngOnInit() {
    console.log('PostListComponent initialized', this.posts());
  }
}
