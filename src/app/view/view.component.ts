import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RebusService } from '../rebus.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public rebus: any;
  public id: string;
  public showSolution = false;

  constructor(
    private route: ActivatedRoute,
    private rebusService: RebusService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rebusService.get(this.id).subscribe((data: Object) => {
      this.rebus = data;
    });
  }
}
