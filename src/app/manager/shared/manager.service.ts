import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Manager } from "../model/manager";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ManagerService {

    private ApiServerUrl = environment.APIbaseUrl;
<<<<<<< HEAD
=======
    private corsPolicy = environment.corsPolicy;
    private  httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'Authorization':'authkey',
        })
      };
>>>>>>> parent of 79b88d2... add http options in employee  services

    constructor(private httpClient: HttpClient) {

    }

    public getManagers(): Observable<Manager[]> {
        return this.httpClient.get<Manager[]>(this.ApiServerUrl + 'manager/all');
    } 
    
}