import { Component, OnInit } from '@angular/core';
import { RiskAssessmentService } from '../../crcs-specialist/risk-assessment.service';
import { Router } from '@angular/router';
import { PagerService } from '../../shared-services/pager.service';
import { DataProvider } from '../../crcs-specialist/provider/data-provider';
import { IRiskAssessment } from '../../crcs-specialist/risk-assessment';
import { RiskasessmentComponent } from '../../crcs-specialist/riskasessment/riskasessment.component';

@Component({
  selector: 'app-ra-approval',
  templateUrl: './ra-approval.component.html',
  styleUrls: ['./ra-approval.component.scss']
})
export class RaApprovalComponent implements OnInit {
  constructor(private _TbdServics: RiskAssessmentService,private _router: Router,private pagerService: PagerService,private riskAssessmentData:DataProvider ) { }

  cpageTitle: string = ' RA Detail';
  errorMessage: string;
  filteredsarDetails: IRiskAssessment[];
  raDetails: IRiskAssessment[] = [];
  _raComponent: RiskasessmentComponent;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  ngOnInit() {
    this._TbdServics.getriskAssments()
    .subscribe(raDetails => {
      this.raDetails = raDetails;
      this.filteredsarDetails = this.raDetails;

      
    },
    error => this.errorMessage = <any>error);

  }

  onRAEdit(raDetails) {
    //  console.log(vddlDetail);
    this.riskAssessmentData.riskAssessmentStorage = raDetails;
    this._TbdServics.RA_Approval = true;
    this._TbdServics.RA_Fields = false;
    this._router.navigate(['/createcrcs']);
  }

}