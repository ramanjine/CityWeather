import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  private _serverError(err: any) {
    return throwError(err || 'backend server error');
  }
  constructor(private _http: HttpClient) { }

  getEuropeanCountries(api: string){
    return this._http.get(api)
    .pipe(map(response => response), catchError(this._serverError));
  }

  getCityDataById(api: string){
    return this._http.get(api)
    .pipe(map(response => response), catchError(this._serverError));
  }
  getForecastForCity(api: string){
    return this._http.get(api)
    .pipe(map(response => response), catchError(this._serverError));
  }
}
