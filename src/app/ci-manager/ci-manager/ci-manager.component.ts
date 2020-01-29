import { Component, OnInit } from '@angular/core';
import { CiManagerService } from '../ci-manager.service';
import { SystemUserProviderService } from '../../system-user-provider.service';

import swal from 'sweetalert2';
import { IVddl } from 'app/client-interface/vd-dl-interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CiMangerClass } from 'app/ci-manager/ci-manger-class';
import { vddlDataProvider } from 'app/client-interface/provider/data-provider';
import { VddlallocationClass } from '../../client-interface/vddlallocation-class';
import { debuglog } from 'util';
import { AllocateViewService } from 'app/shared-modules/allocate/allocate-view.service';

@Component({
  selector: 'app-ci-manager',
  templateUrl: './ci-manager.component.html',
  styleUrls: ['./ci-manager.component.scss'], 
})
export class CiManagerComponent implements OnInit {

  gridItems: Array<any> = [];
  usersItems: any;
  regionItems: any;
  errorMessage: String;
  disableGetButton: boolean = false

  regionSelectedValue: String = "";
  whichRoleActive: String;
  viewAllocateButton: boolean;
  showAllocateReAllocate: boolean;

  vdllAllocateObject:CiMangerClass = new CiMangerClass();

  itemsToAllocateOrREallocate:any;
  repType:any;
  teamMember:string;
  reAllocate:string;
  trackAssignValue:string;


  constructor(private _allo:AllocateViewService, private ciManageService: CiManagerService, private systemUser: SystemUserProviderService, private _router: ActivatedRoute, private router: Router, private vddlData: vddlDataProvider) {

    this.whichRoleActive = _router.snapshot.data["role"];

  }

  ngOnInit() {

    this.getRegion();
    this.getUsers();

    if (this.whichRoleActive == "Allocate") {
      this.viewAllocateButton = true;
      this.getcheckPendAllocateGetNext();
    } else {
      this.viewAllocateButton = false;
      this.getManagerAllocatedVDDL();
    }

  }

  getValue(value) {
    this.regionSelectedValue = value
  }

  getTeamMemberValue(value){
    this.teamMember = value;
  }

  getTextValue(value){
   this.trackAssignValue = value;
  }

  getNextCaseToAllocate() {
    this.ciManageService.getNextCasePending()
      .subscribe(res => {
        if (res != null) {
          this.gridItems.push(res);
          this.disableGetButton = true;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
      error => this.errorMessage = <any>error);
  }


  getCaseByRegion() {

    this.ciManageService.getCaseByRegion(this.regionSelectedValue)
      .subscribe(res => {
        if (res != null) {
          this.gridItems.push(res);
          this.disableGetButton = true;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
      error => this.errorMessage = <any>error);


  }


  getUsers() {
    this.ciManageService.getUsers()
      .subscribe(res => {
        if (res != null) {
          this.usersItems = res;
        } else {
          swal("No Records Found!", "", "info");
        }
      },
      error => this.errorMessage = <any>error);
  }

  allocaTeReallocateButton(item) {
    this.showAllocateReAllocate = true;
    this.itemsToAllocateOrREallocate = item;

  }


  allocateReallocate() {
  
    if( this.itemsToAllocateOrREallocate.VddlAllocation == null){
      this.vdllAllocateObject.VddlAllocation.CaseId =   this.itemsToAllocateOrREallocate.VddlDetails.CaseId;
      this.vdllAllocateObject.VddlAllocation.AllocatorSid = this.systemUser.systemUserStorage.SID;
      this.vdllAllocateObject.VddlAllocation.AllocateeSid = this.teamMember;
      this.vdllAllocateObject.VddlAllocation.IsCurrent = true;
      this.reAllocate = "Allocate";
      this.itemsToAllocateOrREallocate.VddlAllocation = this.vdllAllocateObject.VddlAllocation;
    }else{
      this.reAllocate = "Re Allocate";
      this.vdllAllocateObject = this.itemsToAllocateOrREallocate.VddlAllocation;
      this.itemsToAllocateOrREallocate.VddlAllocation.AllocateeSid = this.teamMember;
    }
  
    this.ciManageService.allocateReallocate(this.itemsToAllocateOrREallocate)
    .subscribe(res =>{
      this.repType = res;
      if(this.repType!= 0){
        this.gridItems = [];
        this.showAllocateReAllocate = false;
        swal(
          'Case',
          ' Case ' + this.reAllocate + ' Successfully',
          'success'
        )
      }

    },
    error => this.errorMessage = <any>error);

  }

  getcheckPendAllocateGetNext() {
    this.ciManageService.getcheckPendAllocateGetNext()
      .subscribe(res => {
        if (res != null) {
          this.gridItems.push(res);
          this.disableGetButton = true;
        }

      },
      error => this.errorMessage = <any>error);

  }

  getRegion() {
    this.ciManageService.getRegion()
      .subscribe(res => {
        this.regionItems = res;
      },
      error => this.errorMessage = <any>error);

  }

  getAllocated(){
    this.ciManageService.getAllocated()
    .subscribe(res => {
      if (res != null) {
        this.gridItems = res;
      } else {
        swal("No Records Found!", "", "info");
      }
    },
    error => this.errorMessage = <any>error);

  }

  getTrackAllocate(){

    this.ciManageService.getTrackAllocate(this.trackAssignValue)
    .subscribe(res => {
      if (res != null) {
        this.gridItems = res;
      } else {
        swal("No Records Found!", "", "info");
      }
    },
    error => this.errorMessage = <any>error);

  }

  getTrackReallocate(){

    this.ciManageService.getTrackReallocate(this.trackAssignValue)
    .subscribe(res => {
      if (res != null) {
        this.gridItems.push = res;
      } else {
        swal("No Records Found!", "", "info");
      }
    },
    error => this.errorMessage = <any>error);

  }

  onTrackButtonClick(){
    if(this.whichRoleActive == "Allocate"){
      this.getTrackAllocate();

    }else{
      this.getTrackReallocate();
    }

  }
  onVddlView(gridItem) {
    //  console.log(vddlDetail);
    if(this.whichRoleActive == "Allocate"){
      this.vddlData.vddlStorage = gridItem;
    }else{
      this.vddlData.vddlStorage = gridItem.VddlDetails;
    }
    this.vddlData.vddlStorage = gridItem.VddlDetails;
    this.router.navigate(['/viewvddl',"false"]);

  }

  getManagerAllocatedVDDL(){
    this.ciManageService.getManagerAllocatedVDDL()
    .subscribe(res => {
      if (res != null) {
        this.gridItems = res;
      } else {
        swal("No Records Found!", "", "info");
      }
    },
    error => this.errorMessage = <any>error);



  }
}
