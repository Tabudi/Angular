import { Injectable } from '@angular/core';

@Injectable()
export class PagerService {

  filteredItems: any;

  pages: number = 100;

  pageSize: number = 3;

  pageNumber: number;

  currentIndex: number;

  items: any;

  pagesIndex: Array<number>;

  pageStart: number = 1;



  inputName: string = '';



  constructor() { }




  init(listOfObj) {

    this.currentIndex = 1;

    this.pageStart = 1;

    this.pages = 4;

    this.filteredItems = listOfObj;



    this.pageNumber = parseInt("" + (this.filteredItems.length / this.pageSize));

    if (this.filteredItems.length % this.pageSize != 0) {

      this.pageNumber++;

    }



    if (this.pageNumber < this.pages) {

      this.pages = this.pageNumber;
    

    }



    this.refreshItems();

    console.log("this.pageNumber :  " + this.pageNumber);



    return {
      items: this.items,
      pagesIndex:this.pagesIndex,
      pageNumber:this.pageNumber,
      currentIndex:this.currentIndex

    }

  }



  // FilterByName() {

  //   this.filteredItems = [];

  //   if (this.inputName != "") {

  //     this.sarData.TbdRefDetails.forEach(element => {

  //       if (element.CompanyNumber.toUpperCase().indexOf(this.inputName.toUpperCase()) >= 0) {

  //         this.filteredItems.push(element);

  //       }

  //     });

  //   } else {

  //     this.filteredItems = this.sarData.TbdRefDetails;

  //   }

  //   console.log(this.filteredItems);

  //   this.init();

  // }

  private fillArray(): any {

    var obj = new Array();

    for (var index = this.pageStart; index < this.pageStart + this.pages; index++) {

      obj.push(index);

    }

    return obj;

  }

  refreshItems() {

    this.items = this.newMethod().slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);

    this.pagesIndex = this.fillArray();

  }

  private newMethod() {


    return this.filteredItems;

  }



  prevPage() {

    if (this.currentIndex > 1) {

      this.currentIndex--;

    }

    if (this.currentIndex < this.pageStart) {

      this.pageStart = this.currentIndex;

    }

    this.refreshItems();

    return {
      items: this.items,
      currentIndex: this.currentIndex,
      pagesIndex:this.pagesIndex,
      pageNumber:this.pageNumber
    }

  }

  nextPage() {

    if (this.currentIndex < this.pageNumber) {

      this.currentIndex++;

    }

    if (this.currentIndex >= (this.pageStart + this.pages)) {

      this.pageStart = this.currentIndex - this.pages + 1;

    }

    this.refreshItems();

    return {
      items: this.items,
      currentIndex: this.currentIndex,
      pagesIndex:this.pagesIndex,
      pageNumber:this.pageNumber
    }


  }

  setPage(index: number) {

    this.currentIndex = index;

    this.refreshItems();

    return {
      items: this.items,
      currentIndex: this.currentIndex,
      pagesIndex:this.pagesIndex,
      pageNumber:this.pageNumber
    }

  }



}
