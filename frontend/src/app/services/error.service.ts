import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Injectable()
export class ErrorService {
  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig) {

    this.toastyConfig.theme = 'bootstrap';
  }

  public notify(error) {
    let toastOptions:ToastOptions = {
      title: "Error " + error.code,
      msg: error.message,
      showClose: true,
      timeout: 5000,
      theme: 'danger'
    };
    this.toastyService.error(toastOptions);
  }
}
