import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConnectionService } from '../services/connection.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {
  filter = new FormControl('');
  newItem = false;
  accessoriesData: any;
  accessoriesFilter: any = {name: ''};
  collection = [];
  accessoriesUrl = 'http://localhost:3000/api/products/accessories';
  page: number = 1;
  pageSize: number = 10;

  headers = ['ID', 'Type', 'Name', 'Color', 'Price', 'Manufacturer'];
  
  constructor(private connectionService: ConnectionService, private loadingService: LoadingService, private spinnerSerive: NgxSpinnerService) { 
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.loadingService.start();
    this.loadJackets();
  }

  loadJackets() {
    this.connectionService.getConfig(this.accessoriesUrl).subscribe(data => {
      this.accessoriesData = data;
    })
  }

  handlePageChange(event) {
    this.page = event;
  }
  setPageSize(pageSize: number){
    this.pageSize = pageSize;
    window.scrollTo(0,0);
  }

  addItem() {
    this.newItem = true;
  }

}
