import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Manager } from "../model/manager";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ManagerService {

    private ApiServerUrl = environment.APIbaseUrl;
    private corsPolicy = environment.corsPolicy;
    private  httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'Authorization':'authkey',
        })
      };

    constructor(private httpClient: HttpClient) {

    }

    public getManagers(): Observable<Manager[]> {
        return this.httpClient.get<Manager[]>('https://cors-anywhere.herokuapp.com/https://em-backend-spingboot.herokuapp.com/api/v1/manager/all', this.httpOptions);
    } 
    
}