import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/api/users.service";
import * as _ from 'lodash';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: Array<any> = [];

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.getAll().subscribe(users => {
      this.users = _.sortBy(users, 'first_name');
    });
  }

}
