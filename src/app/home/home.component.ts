import { HttpErrorResponse } from "@angular/common/http";
import {
    Component,
    ViewChild,
    AfterViewInit,
    ElementRef,
    Renderer2,
    OnInit,
  } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from "../model/employee";
import { Modale } from "../model/modal";
import { EmployeeService } from "../shared/employee.service";
import { Validators } from '@angular/forms'


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit, AfterViewInit {
    public displayEmployeeList : boolean = false;
    public dataLoaded : boolean = false;
    public employees: Employee[];
    public searchEmployees: Employee[];
    public selectedEmployee: Employee = null;
    public modal: Modale = {title: '', buttonTitle: ''};
    public modalFields = new BehaviorSubject(this.modal);
    public employeeForm : FormGroup;
    @ViewChild('wrapper') wrapper: ElementRef;

    constructor(private employeeService: EmployeeService, private fb: FormBuilder,  private renderer: Renderer2, private elementRef: ElementRef,){

    }

    ngOnInit(){
        this.initializeForm();
        this.employeeService.getEmployees().pipe(
        )
        .subscribe(
            (response: Employee[]) => {
                this.employees = response;
                this.searchEmployees = this.employees;
                this.dataLoaded = true;
            }, (error : HttpErrorResponse) => {
                console.error(error);
                // stop the loading animation if we have an error
                this.dataLoaded = true;
            }
        );
        this.modalFields.subscribe();
    }

    ngAfterViewInit() {
        this.toggleMenu();
      }

    public initializeForm() {
        this.employeeForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            jobTitle: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            imageUrl: ['', Validators.required],
        })
    }

    public toggleMenu() {
        if(this.wrapper.nativeElement.classList.contains('toggled')){
            this.renderer.removeClass(this.wrapper.nativeElement, 'toggled');
        } else {
            this.renderer.addClass(this.wrapper.nativeElement, 'toggled');
        }
        
    }
    

    public toggleModale(actionType: String, employee?: Employee) {
        switch(actionType){
            case 'add':
                this.modal.title = 'New employee';
                this.modal.buttonTitle = 'Add';
                this.selectedEmployee = null;
                break;
            case 'edit':
                this.modal.title = 'Edit employee';
                this.modal.buttonTitle = 'Save changes';
                this.selectedEmployee = employee;
                break;
        }
        
        this.modalFields.next(this.modal);

    }

    public searchEmployee(searchValue: string): void {
        if( searchValue === '') {
            this.searchEmployees = this.employees;
        } else {
            this.searchEmployees = this.employees.filter(employee => {
               return  employee.name.toLowerCase().includes(searchValue.toLowerCase());
            })
        }
    }

    public checkForm(): boolean {

        const invalid = this.employeeForm.controls.name.invalid && this.employeeForm.controls.email &&
        this.employeeForm.controls.jobTitle.invalid && this.employeeForm.controls.phoneNumber.invalid &&
        this.employeeForm.controls.imageUrl.invalid;
        console.log(this.employeeForm.controls.name.invalid);
        return invalid ? false : true;
    }

    public addEmployee(): void {
        console.log("form valid: ", this.checkForm());
        console.log('value entred :', this.employeeForm.get('name').value);

    }
}