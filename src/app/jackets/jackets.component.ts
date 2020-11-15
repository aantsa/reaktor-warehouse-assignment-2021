import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConnectionService } from '../services/connection.service';
import { LoadingService } from '../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-jackets',
  templateUrl: './jackets.component.html',
  styleUrls: ['./jackets.component.css']
})
export class JacketsComponent implements OnInit {
  filter = new FormControl('');
  newItem = false;
  jacketData: any;
  jacketFilter: any = {name: '', id: ''};
  jacketUrl = 'http://localhost:3000/posts/';
  page: number = 1;
  pageSize: number = 10;

  headers = ['ID', 'Type', 'Name', 'Color', 'Price', 'Manufacturer'];

  constructor(private connectionService: ConnectionService, private loadingService: LoadingService, private spinnerSerive: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.loadingService.start();
    this.loadJackets();
  }

  loadJackets() {
    this.connectionService.getConfig(this.jacketUrl).subscribe(data => {
      this.jacketData = data;
    })
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    window.scrollTo(0,0);
  }

  addItem() {
    this.newItem = true;
  }
}