import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Availability } from '../models/Availability';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  filter = new FormControl('');
  availabilityData$: Observable<Availability>;
  myData: any;
  dataFound: boolean = true;
  availabilityFilter: any = {id: ''};
  availabilityUrl = 'http://localhost:3000/api/availabilities/';
  page: number = 1;
  pageSize: number = 10;
  timer: number;
  headers = ['ID', 'DATAPAYLOAD'];

  
  ngOnInit(): void {
  }

  constructor(private connectionService: ConnectionService) {
    if(!this.connectionService.availabilityData){
      this.connectionService.loadAvailabilityCache(this.availabilityUrl)
      this.connectionService.availabilityData$.subscribe(
        data => this.myData = data,
        error => alert('An error has occured please refresh the page.'));
    } else {
      this.myData = this.connectionService.availabilityData;
    }
  }

  findById(id: string){
    this.connectionService.findById(this.availabilityUrl, id).subscribe(
      data => {
        this.myData = data; 
        this.dataFound = true},
      error => this.dataFound = false
    );
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    window.scrollTo(0, 0);
  }
}
