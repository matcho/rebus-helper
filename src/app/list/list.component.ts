import { Component, OnInit } from '@angular/core';
import { RebusService } from '../rebus.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public list: Array<Object>;

  constructor(private rebusService: RebusService) { }

  ngOnInit() {
    this.rebusService.list().subscribe((data: Array<Object>) => {
      console.log("data", data);
      this.list = data;
    });
  }

}
