import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "../model/employee";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})



export class EmployeeService {

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

    public getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.corsPolicy + this.ApiServerUrl + 'employee/all', this.httpOptions);
    } 
    public addEmployee(employee: Employee): Observable<Employee> {
        return this.httpClient.post<Employee>(this.ApiServerUrl + 'employee/add', employee);
    }

    public updateEmployee(employee: Employee): Observable<Employee> {
        return this.httpClient.post<Employee>(this.ApiServerUrl + 'employee/update', employee);
    }
    
    public getEmployeesByManagerId(managerId: number) : Observable<Employee[]> {

        return this.httpClient.get<Employee[]>(this.ApiServerUrl + 'employee/all/' + managerId);
    }

    public deleteEmployee(employeeId: number): Observable<void> {
        return this.httpClient.delete<void>(this.ApiServerUrl + 'employee/delete/' + employeeId);
    }
}