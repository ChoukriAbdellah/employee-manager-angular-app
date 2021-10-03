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
    private corsPolicy = environment.corsPolicy;

    constructor(private httpClient: HttpClient) {

    }

    public getManagers(): Observable<Manager[]> {
        return this.httpClient.get<Manager[]>(this.corsPolicy + this.ApiServerUrl + 'manager/all');
    } 
    
}