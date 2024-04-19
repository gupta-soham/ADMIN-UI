/*
 * AMRIT – Accessible Medical Records via Integrated Technology
 * Integrated EHR (Electronic Health Records) Solution
 *
 * Copyright (C) "Piramal Swasthya Management and Research Institute"
 *
 * This file is part of AMRIT.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see https://www.gnu.org/licenses/.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { ComponentMasterServiceService } from 'src/app/core/services/ProviderAdminServices/component-master-service.service';

@Component({
  selector: 'app-component-name-search',
  templateUrl: './component-name-search.component.html',
  styleUrls: ['./component-name-search.component.css'],
})
export class ComponentNameSearchComponent implements OnInit {
  searchTerm!: string;

  components = [];
  pageCount: any;
  selectedComponentsList = [];
  currentPage = 1;
  pager: any = {
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    startPage: 0,
    endPage: 0,
    pages: 0,
  };
  pagedItems = [];
  placeHolderSearch: any;
  current_language_set: any;

  selectedComponent: any = null;
  selectedComponentNo: any;
  message = '';
  selectedItem: any;
  displayedColumns = [
    'loinc_Num',
    'component',
    'system',
    'class1',
    'long_common_name',
    'radiobutton',
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public input: any,
    public dialogRef: MatDialogRef<ComponentNameSearchComponent>,
    private componentMasterServiceService: ComponentMasterServiceService,
  ) {}

  ngOnInit() {
    this.search(this.input.searchTerm, 0);
  }

  selectComponentName(item: any, component: any) {
    this.selectedComponent = null;

    this.selectedComponentNo = item;
    this.selectedComponent = component;
    console.log('selectedComponent', this.selectedComponent);
    this.selectedItem = item;
  }

  submitComponentList() {
    const reqObj = {
      componentNo: this.selectedComponentNo,
      component: this.selectedComponent,
    };
    this.dialogRef.close(reqObj);
  }
  showProgressBar = false;
  search(term: string, pageNo: any): void {
    // this.selectedComponent=null;
    if (term.length > 2) {
      this.showProgressBar = true;
      this.componentMasterServiceService
        .searchComponent(term, pageNo)
        .subscribe(
          (res: any) => {
            if (res.statusCode === 200) {
              this.showProgressBar = false;
              if (res.data && res.data.lonicMaster.length > 0) {
                this.showProgressBar = true;
                this.components = res.data.lonicMaster;

                if (pageNo === 0) {
                  this.pageCount = res.data.pageCount;
                }
                this.pager = this.getPager(pageNo);
                this.showProgressBar = false;
              } else {
                this.message = 'No Record Found';
              }
            } else {
              this.resetData();
              this.showProgressBar = false;
            }
          },
          (err) => {
            this.resetData();
            this.showProgressBar = false;
          },
        );
    }
  }
  checkPager(pager: any, page: any) {
    if (page === 0 && pager.currentPage !== 0) {
      this.setPage(page);
    } else if (pager.currentPage < page) {
      this.setPage(page);
    }
  }
  setPage(page: number) {
    if (page <= this.pageCount - 1 && page >= 0) {
      this.search(this.input.searchTerm, page);
      // get pager object
      this.pager = this.getPager(page);
    }
  }
  getPager(page: any) {
    // Total page count
    const totalPages = this.pageCount;
    // ensure current page isn't out of range
    if (page > totalPages) {
      page = totalPages - 1;
    }
    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      // less than 5 total pages so show all
      startPage = 0;
      endPage = totalPages - 1;
    } else {
      // more than 5 total pages so calculate start and end pages
      if (page <= 2) {
        startPage = 0;
        endPage = 4;
      } else if (page + 2 >= totalPages) {
        startPage = totalPages - 5;
        endPage = totalPages - 1;
      } else {
        startPage = page - 2;
        endPage = page + 2;
      }
    }
    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i,
    );
    // return object with all pager properties required by the view
    return {
      currentPage: page,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages,
    };
  }
  resetData() {
    this.components = [];
    this.pageCount = null;
    this.pager = {
      totalItems: 0,
      currentPage: 0,
      totalPages: 0,
      startPage: 0,
      endPage: 0,
      pages: 0,
    };
  }

  // setEnable()
  // {
  //   this.selectedComponent=null;
  // }
}