import { IResidentailBusinessAddressInterface } from "app/user/residentail-business-address-interface";

export class ResidentailBusinessAddressClass implements IResidentailBusinessAddressInterface {
    UnitNumber: String;
    Complex: String;
    StreetNumber: String;
    StreetName: String;
    SuburbDistrict: String;
    CityTown: String;
    CountryCode: String;
    PostalCod: String;
    AddressId: String;
    CaseId: String;
    ProvinceId: String;
    DateCreated: String;
}
