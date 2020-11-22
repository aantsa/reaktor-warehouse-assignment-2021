import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Availability } from '../models/Availability';
import { Product } from '../models/Products';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  jacketsData$: Observable<Product>;
  shirtsData$: Observable<Product>;
  accessoriesData$: Observable<Product>;
  availabilityData$: Observable<Availability>;
  jacketsData: any;
  shirtsData: any;
  accessoriesData: any;
  availabilityData: any;

  constructor(private http: HttpClient, private loadingService: LoadingService) {
   }

  getProducts(url: string) {
    return this.http.get<Product>(url);
  }

  getAvailability(url: string) {
    return this.http.get<Availability>(url);
  }

  findById(url: string, id: string){
    return this.http.get<Availability>(url+id);
  }

  loadJacketsCache(url: string) {
    this.loadingService.start();
    this.jacketsData$ = this.getProducts(url).pipe(
      shareReplay(1)
    );
    this.jacketsData$
    .subscribe(
      data => {
      this.jacketsData = data,
      this.loadingService.stop()
      setInterval(() => { this.loadJacketsCache(url)}, 300000)
      },
      error => alert('An error has occured please refresh the page.'));
      return this.jacketsData;
    
  }

  loadShirtsCache(url: string) {
    this.loadingService.start();
    this.shirtsData$ = this.getProducts(url).pipe(
      shareReplay(1)
    );
    this.shirtsData$
    .subscribe(
      data => {
      this.shirtsData = data,
      this.loadingService.stop()
      setInterval(() => { this.loadShirtsCache(url)}, 300000)
      },
      error => alert('An error has occured please refresh the page.'));
      
  }
  
  loadAccessoriesCache(url: string) {
    this.loadingService.start();
    this.accessoriesData$ = this.getProducts(url).pipe(
      shareReplay(1)
    );
    this.accessoriesData$
    .subscribe(
      data => {
      this.accessoriesData = data,
      this.loadingService.stop()
      setInterval(() => { this.loadAccessoriesCache(url)}, 300000)
      },
      error => alert('An error has occured please refresh the page.'));
  }

  loadAvailabilityCache(url: string) {
    this.loadingService.start();
    this.availabilityData$ = this.getAvailability(url).pipe(
      shareReplay(1)
    );
    this.availabilityData$
    .subscribe(
      data => {
      this.availabilityData = data,
      this.loadingService.stop()
      setInterval(() => { this.loadAvailabilityCache(url)}, 300000)
      },
      error => alert('An error has occured please refresh the page.'));
  }
} 

