import { ISearch } from "app/search/search-interface";

export class SearchClass implements ISearch {
    CaseId: string;
    Status: string; 
    CaseRefNo:string;
    CustomsExciseCode:string;
    CompanyRegisteredNumber:string;
    TradingName:string;
    IncomeTax:string;
    VATNumber:string;
    DateCreated:string;
    SAR_VDD:string;

    constructor( ) {};
}
