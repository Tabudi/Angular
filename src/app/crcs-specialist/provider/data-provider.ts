import { Injectable } from '@angular/core';
import { IRiskAssessment } from '../risk-assessment';

@Injectable()

export class DataProvider {
    public riskAssessmentStorage : IRiskAssessment;
    
    constructor(){}

}
