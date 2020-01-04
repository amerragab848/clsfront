import { Injectable, TemplateRef  } from '@angular/core';
import Swal from 'sweetalert2';
 
@Injectable({
  providedIn: 'root'
})
export class ToastService {
 
  swal: any =Swal;

  success(title,text){
    this.swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Cool'
    });
  }

  error(title,text){
    this.swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'Cool'
    });
  }

  warning(title,text){
    this.swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonText: 'Cool'
    });
  }

}