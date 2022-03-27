import { Component, OnInit, Input } from '@angular/core';
import { Article } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'], 
  host: {
    class: 'row'
  }
})

export class ArticleComponent implements OnInit {
  
  @Input() article!: Article;

  constructor() {}

  voteUp(): boolean {
    console.log("voteup is called.");
    // this.votes += 1;
    this.article.voteUp();
    return false;
  }

  voteDown(): boolean {
    console.log("votedown is called")
    // this.votes -= 1;
    this.article.voteDown();
    return false;
  }

  ngOnInit(): void {

  }

}
