import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IMqttMessage, MqttService } from "ngx-mqtt";
import { ITempHumid } from "../models/ITempHumid";
import { Chart } from 'chart.js';
import { Targets } from "../data/targets";
import { ITarget } from '../models/ITarget';
import { DecimalRounder } from "../shared/decimalRounder";
import { ClientStatusService } from "../services/client-status.service";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})

export class MonitorComponent implements OnInit, AfterViewInit {

  targetData: ITarget[] = Targets;
  temperature: string = "0";
  humidity: string = "0";
  time_data: string[] = [];
  chart = [];
  timeIntervals: number = 0;
  decimalRounder: DecimalRounder;

  constructor(private _mqttService: MqttService, private _clientStatusService: ClientStatusService) {
    this.decimalRounder = new DecimalRounder();

    // Online Status
    this._mqttService.observeRetained('ESP32_4WIN/status', { qos: 1, rap: false }).subscribe((m: IMqttMessage) => {
      
      const statusResponse = m.payload.toString();
      const isOnline: boolean = statusResponse === "Online" ? true : false

      if (isOnline) {

        // Temperature
        this._mqttService.observeRetained('', { qos: 2 }).subscribe((m: IMqttMessage) => {
          this.temperature = m.payload.toString();
          this.update_Temp_Hum_Data();
        });

        // Humidity
        this._mqttService.observeRetained('', { qos: 2 }).subscribe((m: IMqttMessage) => {
          this.humidity = m.payload.toString();
          this.update_Temp_Hum_Data();
        });
      }
      else{
        this.temperature = "0";
        this.humidity = "0";
      }

      // Update status service to indicate the client status
      this._clientStatusService.updateStatus(isOnline);

    });

    this.time_data.push(this.getTime());
  }

  ngAfterViewInit(): void {
    this.build_Temp_Hum_Chart();
  }

  ngOnInit(): void {
  }

  update_Temp_Hum_Data(): void {
    this.chart[0].data.labels.push(this.getTime());
    this.chart[0].data.datasets[0].data.push(this.temperature);
    this.chart[0].data.datasets[1].data.push(this.humidity);

    if (this.chart[0].data.datasets[0].data.length > 8) {
      this.chart[0].data.datasets[0].data.shift();
      this.chart[0].data.datasets[1].data.shift();
      this.chart[0].data.labels.shift();
    }

    this.chart[0].update();
    this.timeIntervals = this.chart[0].data.labels.length;
  }

  getTime(): string {
    var d = new Date();
    return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }

  build_Temp_Hum_Chart(): void {
    let x = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: ' Temperature',
          backgroundColor: '#c2464180',
          color: 'rgb(255, 99, 132)',
          borderColor: '#C24641',
          data: [],
          pointRadius: 8,
          pointStyle: 'rectRounded',
          tension: 0
        },
        {
          label: ' Humidity',
          backgroundColor: '#357ec778',
          color: '#357EC7',
          borderColor: '#357EC7',
          data: [],
          pointRadius: 8,
          pointStyle: 'rectRounded',
          tension: 0
        }]
      },
      // Configuration options go here
      options: {
        onHover: function (e, element) {
          const point = this.getElementAtEvent(e);
          if (point.length) e.target.style.cursor = 'pointer'
          else e.target.style.cursor = 'default';
        },
        scales: {
          yAxes: [{
            ticks: {
              max: 100,
              min: 0,
              fontColor: "white"
              // ,
              // callback: function (value, index, values) {
              //   return value + ' mm/s';
              // }
            },
            scaleLabel: {
              display: true,
              labelString: "Temperature / Humidity",
              fontColor: "orange"
            },
          },
          ],
          xAxes: [{
            ticks: {
              fontColor: "white",
              callback: function (value, index, values) {
                return value + '';
              }
            },
            scaleLabel: {
              display: true,
              labelString: "Time",
              fontColor: "orange"
            },
          }]
        },
        legend: {
          position: 'top',
          labels: {
            fontSize: 14,
            boxWidth: 12,
            usePointStyle: true,
            fontColor: 'white'
          }
        },
        tooltips: {
          titleAlign: 'center',
          callbacks: {
            title: function (tooltipItem, data) {
              var title = tooltipItem[0].label + ' T';
              return title;
            }
          }
        }
      }
    });
    this.chart.push(x);
  }

}
