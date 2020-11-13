import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConnectionService } from '../services/connection.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-shirts',
  templateUrl: './shirts.component.html',
  styleUrls: ['./shirts.component.css']
})
export class ShirtsComponent implements OnInit {
  filter = new FormControl('');
  newItem = false;
  shirtsData: any;
  shirtFilter: any = {name: ''};
  shirtUrl = 'https://bad-api-assignment.reaktor.com/products/shirts';
  page: number = 1;
  pageSize: number = 10;

  headers = ['ID', 'Type', 'Name', 'Color', 'Price', 'Manufacturer'];

  constructor(private connectionService: ConnectionService, private loadingService: LoadingService,
     private spinnerSerive: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadingService.start();
    this.loadShirts();
  }

  loadShirts() {
    this.connectionService.getConfig(this.shirtUrl).subscribe(data => {
      this.shirtsData = data;
    })
  }

  handlePageChange(event: number) {
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