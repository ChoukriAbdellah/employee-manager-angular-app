import {OnInit, Component, Input} from '@angular/core';
import { Manager } from '../manager/model/manager';
import { Employee } from '../model/employee';
import { EmployeeService } from '../shared/employee.service';

@Component( {
    selector : 'see-more', 
    templateUrl : 'see-more.component.html',
    styleUrls : ['see-more.style.css'],
})

export class SeeMoreComponent implements OnInit {

    @Input() manager : Manager;
    public employees: Employee[];

    constructor( private employeeService: EmployeeService) {

    }

    ngOnInit() {
        if(this.manager) {
            this.employeeService.getEmployeesByManagerId(this.manager.id).subscribe(employees => {
                this.employees = employees;
                console.log(this.employees);
            })
        }
    }
}