import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Table } from '../_models/table';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  prefix = environment.apiUrl;
  postfix = environment.param;

  constructor(private http: HttpClient) { }

  sendForm(model: any) {
    return JSON.stringify(model);
  }
}
