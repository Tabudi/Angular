import { Component, OnInit } from '@angular/core';
import { UserAdminClass } from '../user-admin-class';
import { IUserAdminInterface } from 'app/admin/user-admin-interface';
import { UserAdminService } from '../user-admin.service';

import swal from 'sweetalert2';
import { PagerService } from '../../shared-services/pager.service';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

  userAdmin: UserAdminClass = new UserAdminClass();

  userAdminItems: Array<any>;
  errorMessage: string;
  userRoleItems: Array<any>;
  regionItems: Array<any>;


  items: Array<any>;

  pageNumber: number = 0;
  currentIndex: number = 1;
  pagesIndex: Array<number>;

  constructor(private userAdminService: UserAdminService, private pagerService: PagerService) {
    this.getAllroles();
    this.getRegion();
  }

  ngOnInit() {
    this.getAlluser();


  }


  getAlluser() {

    this.userAdminService.getAlluser()
      .subscribe(res => {
        if (res != null) {
          this.userAdminItems = res;
          let userIitmes = this.pagerService.init(this.userAdminItems);
          this.items = userIitmes.items;
          this.pageNumber = userIitmes.pageNumber;
          this.currentIndex = userIitmes.currentIndex;
          this.pagesIndex = userIitmes.pagesIndex;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);
  }

  getAllroles() {
    this.userAdminService.getAllroles()
      .subscribe(res => {
        if (res != null) {
          this.userRoleItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }

  getRegion() {
    this.userAdminService.getRegion()
      .subscribe(res => {
        if (res != null) {
          this.regionItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
        error => this.errorMessage = <any>error);

  }

  userEdit(userAdminItem) {
    this.userAdmin = userAdminItem;

  }

  addUser(user) {
    this.userAdminService.saveUser(user)
      .subscribe(res => {
        swal(
          'User',
          'User Added/Updated Successfully',
          'success'
        )
        this.userAdmin = new UserAdminClass();
      },
        error => this.errorMessage = <any>error);


  }

  prevPage() {

    let prevpage = this.pagerService.prevPage();
    this.items = prevpage.items;
    this.pagesIndex = prevpage.pagesIndex;
    this.pageNumber = prevpage.pageNumber;
    this.currentIndex = prevpage.currentIndex;

  }

  nextPage() {

    let nextpage = this.pagerService.prevPage();
    this.items = nextpage.items;
    this.pagesIndex = nextpage.pagesIndex;
    this.pageNumber = nextpage.pageNumber;
    this.currentIndex = nextpage.currentIndex;


  }

  setPage(index) {

    let setpage = this.pagerService.setPage(index);
    this.items = setpage.items;
    this.pagesIndex = setpage.pagesIndex;
    this.pageNumber = setpage.pageNumber;
    this.currentIndex = setpage.currentIndex;

  }

}
