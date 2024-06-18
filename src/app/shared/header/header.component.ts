import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUrl!: string

  constructor(
    private router: Router,
    private store: Store,
  ) {
        const currentUrl = this.router.url;
        this.currentUrl = currentUrl
  }

  ngOnInit(): void {
  }

  toggleButton(){
    if(this.currentUrl == '/map'){
      return true
    } else {
      return false
    }
  }


}
