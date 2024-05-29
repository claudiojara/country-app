import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-table',
  templateUrl: './countryTable.component.html',
  styles: [
  ]
})


export class CountryTableComponent {
  @Input()
  public countries: Country[] = [];

}
