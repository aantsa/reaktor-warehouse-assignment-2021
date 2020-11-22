import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../models/Products';
import { ConnectionService } from '../services/connection.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit, OnDestroy {
  filter = new FormControl('');
  accessoriesData$: Observable<Product>;
  myData: any;
  accessoriesFilter: any = {name: ''};
  collection = [];
  accessoriesUrl = 'http://localhost:3000/api/products/accessories';
  page: number = 1;
  pageSize: number = 10;

  headers = ['ID', 'Type', 'Name', 'Color', 'Price', 'Manufacturer'];
  
  ngOnInit(): void {
  }

  constructor(private connectionService: ConnectionService, private loadingService: LoadingService) { 
    if(!this.connectionService.accessoriesData){
      this.connectionService.loadAccessoriesCache(this.accessoriesUrl)
      this.connectionService.accessoriesData$.subscribe(
        data => this.myData = data,
      error => alert('An error has occured please refresh the page.'));
    } else {
      this.myData = this.connectionService.accessoriesData;
    }
  }
  ngOnDestroy(): void {
    this.loadingService.stop();
  }

  findByName(name: string){
    this.myData = this.connectionService.findById(this.accessoriesUrl, name);
  }

  handlePageChange(event) {
    this.page = event;
  }
  
  setPageSize(pageSize: number){
    this.pageSize = pageSize;
    window.scrollTo(0,0);
  }

}
