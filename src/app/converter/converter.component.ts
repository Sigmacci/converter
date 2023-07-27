import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Table } from '../_models/table';
import { CurrencyService } from '../_services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
});
export class ConverterComponent implements OnInit {

  model: any = {};
  prefix = environment.apiUrl;
  postfix = environment.param;
  table: Table | undefined;
  converted?: number;

  constructor(private http: HttpClient, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.http.get(this.prefix + 'tables/a' + this.postfix).subscribe({
      next: response => {
        let st = JSON.stringify(response);
        this.table = JSON.parse(st)[0]
      }
    });
  }

  convert() {
    let y = this.table?.rates.find(r => r.code === this.model.convertFrom)?.mid;
    this.converted = this.model.money * y!;
    let x = this.table?.rates.find(r => r.code === this.model.convertTo)?.mid;
    this.converted = this.converted / x!;
    this.model.converted = this.converted.toFixed(2);
  }

  swap() {
    let v = this.model.convertFrom;
    this.model.convertFrom = this.model.convertTo;
    this.model.convertTo = v;
  }

}
