import { Component } from '@angular/core';
import { RebusService } from './rebus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rebus-helper';

  public constructor(
    private rebusService: RebusService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public showRandom() {

    this.rebusService.list().subscribe((data: Array<Object>) => {
      const idx = Math.floor(Math.random() * data.length);
      const id = data[idx]["key"];
      this.router.navigate([ '/view', id ]);
    });
  }
}
