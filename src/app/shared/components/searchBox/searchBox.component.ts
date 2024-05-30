import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './searchBox.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy {


  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input()
  initialValue: string = '';

  @Input()
  placeholder: string = 'Search...';

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(value =>
        this.onDebounce.emit(value)
      )
  }

  ngOnDestroy(): void {
    if (this.debouncerSubscription) {
      this.debouncerSubscription.unsubscribe();
    }
  }

  // emitSearchByCapital(term: string) {
  //   this.onValue.emit(term);
  // }

  keypress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }

}
