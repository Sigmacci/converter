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
  tables: Table[] | undefined;

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
        this.tables = newResponse;
      }
    })
  }

  compare(currentRate: Rate) {
    const previousRate = this.tableToCompare?.rates.find(x => x.code === currentRate.code);
    return (currentRate.mid - previousRate?.mid!) / previousRate?.mid! * 100;
  }

  chartOptions(code: string) {
    let dataOptions = [];
    for (let table of this.tables!) {
      dataOptions.push({ x: new Date(table?.effectiveDate!), y: table?.rates.find(r => r.code === code)?.mid, color: "rgba(225,150,150,0)" });
      console.log(table?.rates.find(r => r.code === code)?.mid);
    }
    return {
      backgroundColor: "rgba(225,150,150,0)",
      axisX: {
        lineThickness: 0,
        valueFormatString: ' ',
        tickLength: 0,
        labelFormatter: ""
      },
      axisY: {
        lineThickness: 0,
        valueFormatString: ' ',
        gridThickness: 0,
        tickLength: 0,
        labelFormatter: ""
      },
      data: [{
          type: "line",
          lineColor: "rgb(102, 255, 51)",
          dataPointColor: "green",
          dataPoints: dataOptions
        }]
      }
    }
  }
