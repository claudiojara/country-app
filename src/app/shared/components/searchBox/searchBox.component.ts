import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './searchBox.component.html'
})
export class SearchBoxComponent {
  @Input()
  placeholder: string = 'Search...';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  emitSearchByCapital(term: string) {
    this.onValue.emit(term);
  }

}
