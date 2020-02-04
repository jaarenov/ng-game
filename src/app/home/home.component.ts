import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private service: UserService) {}

  ngOnInit() {
    this.users$ = this.service.getData();
  }
}
