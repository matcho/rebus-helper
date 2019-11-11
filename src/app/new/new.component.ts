import { Component, OnInit } from '@angular/core';
import { ElementRebus } from '../ElementRebus';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public elements: Array<ElementRebus> = [];
  public solution: string;

  constructor() {
    this.solution = "";
  }

  ngOnInit() {
    this.addElement();
  }

  public apercuSolution() {
    return this.elements.map((e: any) => e.motAffiche).join(" - ");
  }

  public addElement() {
    this.elements.push(new ElementRebus(
      "",
      // "https://france3-regions.francetvinfo.fr/normandie/sites/regions_france3/files/styles/top_big/public/assets/images/2018/06/27/maxstockworld366544-3731571.jpg?itok=RRWQk0aC"
    ));
  }

  public removeElement(i: number) {
    this.elements.splice(i, 1);
  }

}
