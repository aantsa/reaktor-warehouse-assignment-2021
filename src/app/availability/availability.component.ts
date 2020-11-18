import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConnectionService } from '../services/connection.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  filter = new FormControl('');
  newItem = false;
  availabilityData: any;
  availabilityFilter: any = {id: ''};
  availabilityUrl = 'http://localhost:3000/api/availabilities/';
  page: number = 1;
  pageSize: number = 10;
  timer: number;

  headers = ['ID', 'DATAPAYLOAD'];

  constructor(private connectionService: ConnectionService, private loadingService: LoadingService, private spinnerSerive: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.loadingService.start();
    this.loadAvailabilities();
  }

  loadAvailabilities() {
    this.connectionService.getConfig(this.availabilityUrl)
      .subscribe(
      data => this.availabilityData = data,
      error => alert('An error has occured please refresh the page.'));
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    window.scrollTo(0, 0);
  }

  addItem() {
    this.newItem = true;
  }
}
