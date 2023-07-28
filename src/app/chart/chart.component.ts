import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Table } from '../_models/table';
import { HttpClient } from '@angular/common/http';
import { Rate } from '../_models/rate';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  prefix = environment.apiUrl;
  postfix = environment.param;
  table: Table | undefined;
  tableToCompare: Table | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.prefix + 'tables/a' + this.postfix).subscribe({
      next: response => {
        let st = JSON.stringify(response);
        this.table = JSON.parse(st)[0]
      }
    });
    this.http.get(this.prefix + 'tables/a/last/7' + this.postfix).subscribe({
      next: response => {
        const newResponse = JSON.parse(JSON.stringify(response));
        let i = -1;
        for (let obj of newResponse) {
          i++;
        }
        this.tableToCompare = newResponse[i - 1];
        console.log(this.tableToCompare);
      }
    })
  }

  compare(currentRate: Rate) {
    const previousRate = this.tableToCompare?.rates.find(x => x.code === currentRate.code);
    return (currentRate.mid - previousRate?.mid!) / previousRate?.mid! * 100;
  }
}
