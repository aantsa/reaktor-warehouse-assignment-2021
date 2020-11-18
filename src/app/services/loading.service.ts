import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private spinnerSerive: NgxSpinnerService) { }

  start() {
    this.spinnerSerive.show(undefined, {
      type: 'ball-clip-rotate',
      color: 'black',
      bdColor: '#ffffff',
    });
    setTimeout(() => {
      this.spinnerSerive.hide();
    }, 5000);
  }

}
