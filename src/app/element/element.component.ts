import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementRebus } from '../ElementRebus';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

  @Input("element")
  private element: ElementRebus;

  @Output()
  public onRemove: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public remove() {
    this.onRemove.emit();
  }

}
