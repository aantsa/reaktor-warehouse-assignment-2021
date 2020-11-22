import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from '../models/Products';
import { ConnectionService } from '../services/connection.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-shirts',
  templateUrl: './shirts.component.html',
  styleUrls: ['./shirts.component.css']
})
export class ShirtsComponent implements OnInit, OnDestroy {
  filter = new FormControl('');
  shirtsData$: Observable<Product>;
  myData: any = '';
  shirtFilter: any = { name: '' };
  shirtsUrl = 'http://localhost:3000/api/products/shirts';
  page: number = 1;
  pageSize: number = 10;
  loading: boolean = true;

  headers = ['ID', 'Type', 'Name', 'Color', 'Price', 'Manufacturer'];

  constructor(private connectionService: ConnectionService, private loadingService: LoadingService) {
    if(!this.connectionService.shirtsData){
      this.connectionService.loadShirtsCache(this.shirtsUrl)
      this.connectionService.shirtsData$.subscribe(
        data => this.myData = data,
      error => alert('An error has occured please refresh the page.'));
    } else {
      this.myData = this.connectionService.shirtsData;
    }
  }

  ngOnDestroy(): void {
    this.loadingService.stop();
  }

  findByName(name: string){
    this.myData = this.connectionService.findById(this.shirtsUrl, name);
  }

  ngOnInit(): void {
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    window.scrollTo(0, 0);
  }
}