import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ClientStatusService } from "../../services/client-status.service";

@Component({
  selector: 'app-client-status',
  templateUrl: './client-status.component.html',
  styleUrls: ['./client-status.component.css']
})
export class ClientStatusComponent implements OnInit {

  isOnline: boolean;

  constructor(private _clientStatusService: ClientStatusService) {
    this._clientStatusService.status$.subscribe(a => {
      this.isOnline = a;
    });
  }

  ngOnInit(): void {
  }

}
