import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import {City}  from './city';
@Injectable()
export class SharedService {
    selectedCity: City;
    _selectedCity = new BehaviorSubject<City>(new City);
    constructor(){
        this._selectedCity.next(this.selectedCity);

    }

    updateSelectedCity(city: City) {

        this.selectedCity = city;
        this._selectedCity.next(this.selectedCity);

}
}