import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { nextTick } from 'process';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  jacketData: Object;
  shirt: ':shirts';
  type: 'jackets';

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getConfig(url: string) {
    return this.http.get(url);
  }

  getFetch(url){
    
  }

  // deleteJacket(url:string){
  //   return this.http.delete(url);
  // }
} 

