import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConnectionService } from '../services/connection.service';
import { Product } from '../models/Products';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-jackets',
  templateUrl: './jackets.component.html',
  styleUrls: ['./jackets.component.css']
})
export class JacketsComponent implements OnInit, OnDestroy {
  filter = new FormControl('');
  jacketData$: Observable<Product>;
  myData: any;
  jacketFilter: any = {name: ''};
  jacketUrl = 'http://localhost:3000/api/products/jackets/';
  page: number = 1;
  pageSize: number = 10;
  

  headers = ['ID', 'Type', 'Name', 'Color', 'Price', 'Manufacturer'];

  constructor(private connectionService: ConnectionService, private loadingService: LoadingService) {
    if(!this.connectionService.jacketsData){
      this.connectionService.loadJacketsCache(this.jacketUrl)
      this.connectionService.jacketsData$.subscribe(
        data => this.myData = data,
      error => alert('An error has occured please refresh the page.'));
    } else {
      this.myData = this.connectionService.jacketsData;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.loadingService.stop();
  }

  findByName(name: string){
    this.myData = this.connectionService.findById(this.jacketUrl, name);
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    window.scrollTo(0, 0);
  }
}