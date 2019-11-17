import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementRebus } from '../ElementRebus';
import { ImageSearchService } from '../image-search.service';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent implements OnInit {

  @Input("element")
  public element: ElementRebus;

  @Output()
  public onRemove: EventEmitter<any> = new EventEmitter();

  private images: string[] = [];
  private index: number;

  constructor(private imageSearchService: ImageSearchService) {
    this.index = 0;
  }

  ngOnInit() {
  }

  public remove() {
    this.onRemove.emit();
  }

  public searchImages() {
    // @TODO show progressbar
    this.imageSearchService.search(this.element.motRecherche).subscribe((data: any) => {
      // @TODO hide progressbar
      if (data && data.items && Array.isArray(data.items)) {
        this.images = data.items.map((i) => {
          return i.link;
        });
        this.index = 0;
        this.updateImage();
      } else {
        console.error("google images query failed", data);
      }
      
    });

  }

  public get noNextImage(): boolean {
    return this.images.length === 0 || (this.index === this.images.length - 1);
  }

  public get noPreviousImage(): boolean {
    return this.index === 0;
  }

  public get emptySearchTerm(): boolean {
    return this.element.motRecherche === "";
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
