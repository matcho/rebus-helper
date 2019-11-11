import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementRebus } from '../ElementRebus';

// import GoogleImageSearch from 'free-google-image-search'

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

  private images: string[] = [];
  private index: number;

  constructor() {
    this.index = 0;
  }

  ngOnInit() {
  }

  public remove() {
    this.onRemove.emit();
  }

  public searchImages() {
    console.log("search images", this.element.motRecherche);
    this.images = [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/ONE_Campaign.svg/1200px-ONE_Campaign.svg.png",
      "https://www.empruntemontoutou.com/wp-content/uploads/2017/06/2-58c3a1251638dIMG_28a4.jpg",
      "http://www.chartsinfrance.net/style/breves/6/photo_1407923223.jpg"
    ];
    this.index = 0;
    this.updateImage();

    /* GoogleImageSearch.searchImage(this.element.motRecherche)
    .then((res) => {
        console.log(res); // This will return array of image URLs
        this.images = res;
    }); */

  }

  public get noNextImage(): boolean {
    return this.images.length === 0 || (this.index === this.images.length - 1);
  }

  public get noPreviousImage(): boolean {
    return this.index === 0;
  }

  public nextImage() {
    this.index++;
    this.updateImage();
  }

  public previousImage() {
    this.index--;
    this.updateImage();
  }

  private updateImage() {
    this.element.setImage(this.images[this.index]);
  }
}
