import { Component, OnInit } from '@angular/core';
import { RiskAssessmentService } from 'app/crcs-specialist/risk-assessment.service';
import { Router } from '@angular/router';
import { DataProvider } from 'app/crcs-specialist/provider/data-provider';
import { IRiskAssessment } from 'app/crcs-specialist/risk-assessment';
import { PagerService } from '../../shared-services/pager.service';
import { RiskasessmentComponent } from '../riskasessment/riskasessment.component';

@Component({
  selector: 'app-crcsworkinprogress',
  templateUrl: './crcsworkinprogress.component.html',
  styleUrls: ['./crcsworkinprogress.component.scss']
})
export class CrcsworkinprogressComponent implements OnInit {

  constructor(private _TbdServics: RiskAssessmentService, private _router: Router,private pagerService: PagerService,private riskAssessmentData:DataProvider ) { }

  cpageTitle: string = ' RA Detail';
  errorMessage: string;
  filteredsarDetails: IRiskAssessment[];
  raDetails: IRiskAssessment[] = [];

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
    // this._raComponent.RA_Approval = true;
    // this._raComponent.RA_Fields = false;
    this._router.navigate(['/createcrcs']);
  }

}
