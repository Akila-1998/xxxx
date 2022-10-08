import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConfig} from "../../app.config";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  submit(data: any): Observable<any> {

    const body = data;
    const path = AppConfig.API_PATH+"diabetes-predict";
    const header = ApiService.setHttpHeader({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(path, body, header);
  }

  calculate(data: any): Observable<any> {

    const body = data;
    const path = AppConfig.API_PATH+"bmi";
    const header = ApiService.setHttpHeader({

      'Content-Type': 'application/json',
    });

    return this.http.post<any>(path, body, header);
  }

  private static setHttpHeader(hd:any){
    return {headers: new HttpHeaders(hd)};
  }
}
