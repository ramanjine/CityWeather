import { Component, OnInit } from '@angular/core';
import {WeatherServiceService} from '../../shared/weather-service.service';
import {AppConstants} from '../../app.constant';
import {City} from '../../shared/city';
import { Router } from '@angular/router';
import {SharedService} from '../../shared/shared-service';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-citylist',
  templateUrl: './citylist.component.html',
  styleUrls: ['./citylist.component.scss']
})
export class CitylistComponent implements OnInit {

  lat = 40.4637;
  lang = 3.7492;
  count = 6;
  apiUrl: string;
  cities :any;
  cityList: Array<City> = [];

  constructor(private weatherService: WeatherServiceService,private appConstants: AppConstants,private _router: Router, private shareService: SharedService
    ){

  }
  ngOnInit(): void{
    let allCities;
    // api call to get cities.
    this.apiUrl = this.appConstants.api + 'find?lat=' + this.lat + '&' + 'lon=' + this.lang + '&cnt=' + this.count + '&appid=' + this.appConstants.apikey;
    this.weatherService.getEuropeanCountries(this.apiUrl).subscribe( (result) =>{
      console.log("logo");
       allCities = result;
      console.log(this.cities);
      allCities.list.forEach(c => {
        //api call to get city data 
        let cityApi = this.appConstants.api + 'weather?id=' + c.id  + '&appid=' + this.appConstants.apikey;
         this.weatherService.getCityDataById(cityApi).subscribe((data) =>
         {
          let newCity = new City();
          newCity.name = data['name'];
          newCity.temp = +(data['main'].temp - 273.15).toFixed(2);
       newCity.sunrise = new Date(data['sys'].sunrise * 1000).toJSON().split("T")[1].split(".")[0];
       newCity.sunset = new Date(data['sys'].sunset * 1000).toJSON().split("T")[1].split(".")[0];
          newCity.sealevel= data['main'].sea_level;
          newCity.id = data['id'];
          this.cityList.push(newCity);
         })

      });
    });
  }

 
  // redirect(item: City){
  //   this.shareService.updateSelectedCity(item);
  //   this._router.navigate(['weatherDetails']);

  // }
}
