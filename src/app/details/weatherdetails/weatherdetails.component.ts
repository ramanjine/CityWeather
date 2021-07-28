import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../shared/shared-service';
import {WeatherServiceService} from '../../shared/weather-service.service';
import {AppConstants} from '../../app.constant';
import { ActivatedRoute } from '@angular/router';
import {City} from '../../shared/city';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.scss']
})
export class WeatherdetailsComponent implements OnInit {

  constructor(private _sharedService: SharedService, private weatherService: WeatherServiceService, private appConst: AppConstants,private _Activatedroute:ActivatedRoute) { }
   forecatsAtnine: Array<City> = [];

  ngOnInit(): void {
    let id=this._Activatedroute.snapshot.paramMap.get("id");
      // api to get city forecatdata
      let api = this.appConst.api + 'forecast?id=' + id + '&appid=' + this.appConst.apikey; 
      this.weatherService.getForecastForCity(api).subscribe((result) => {
        let cityName = result['city'].name;
          result['list'].forEach(element => {
            if(element.dt_txt !+ null && element.dt_txt.includes('09:00:00')){
              let newCity = new City();
              newCity.temp = +(element['main'].temp - 273.15).toFixed(2);
              newCity.sealevel= +(element['main'].sea_level * 67.20).toFixed(2);
              newCity.name = cityName;
              newCity.date = new Date(element.dt_txt).toLocaleString("en-US")
               this.forecatsAtnine.push(newCity);
            }
          });
      });
    
  }

}
