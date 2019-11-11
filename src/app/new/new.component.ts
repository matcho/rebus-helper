import { Component, OnInit } from '@angular/core';
import { ElementRebus } from '../ElementRebus';
import { RebusService } from '../rebus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  public elements: Array<ElementRebus> = [];
  public solution: string;

  constructor(
    private rebusService: RebusService,
    private router: Router
  ) {
    this.solution = "";
  }

  ngOnInit() {
    this.addElement();
  }

  public apercuSolution() {
    return this.elements.map((e: any) => e.motAffiche).join(" - ");
  }

  public addElement() {
    this.elements.push(new ElementRebus(""));
  }

  public removeElement(i: number) {
    this.elements.splice(i, 1);
  }

  public save() {
    console.log("SAVING");
    const mots = this.elements.map((e: any) => e.motAffiche);
    const images = this.elements.map((e: any) => e.image);
    this.rebusService.add(mots, images, this.solution).subscribe((data: string) => {
      this.router.navigate([ "/view", data ]);
    });
  }

}
