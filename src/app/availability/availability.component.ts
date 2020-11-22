import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Availability } from '../models/Availability';
import { ConnectionService } from '../services/connection.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit, OnDestroy {
  filter = new FormControl('');
  availabilityData$: Observable<Availability>;
  myData: any;
  dataFound: boolean = true;
  availabilityFilter: any = {id: ''};
  availabilityUrl = `${environment.apiUrl}/api/availabilities/`;
  page: number = 1;
  pageSize: number = 10;
  timer: number;
  headers = ['ID', 'DATAPAYLOAD'];

  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.loadingService.stop();
  }

  constructor(private connectionService: ConnectionService, private loadingService: LoadingService) {
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
