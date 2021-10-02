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
import { FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from "../model/employee";
import { Modale } from "../model/modal";
import { EmployeeService } from "../shared/employee.service";


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit, AfterViewInit {
    public displayEmployeeList : boolean = false;
    public employees: Employee[];
    public selectedEmployee: Employee = null;
    public modal: Modale = {title: '', buttonTitle: ''};
    public modalFields = new BehaviorSubject(this.modal);
    public employeeForm : FormGroup;
    @ViewChild('wrapper') wrapper: ElementRef;

    constructor(private employeeService: EmployeeService, private fb: FormBuilder,  private renderer: Renderer2, private elementRef: ElementRef,){

    }

    ngOnInit(){
        this.initializeForm();
        this.employeeService.getEmployees().subscribe(
            (response: Employee[]) => {
                this.employees = response;
            }, (error : HttpErrorResponse) => {
                console.error(error);
                
            }
        );
        this.modalFields.subscribe();
    }

    ngAfterViewInit() {
        this.toggleMenu();
        console.log(this.wrapper.nativeElement);
      }

    public initializeForm() {
        this.employeeForm = this.fb.group({
            name: '',
            email: '',
            jobTitle: '',
            phoneNumber: '',
            imageUrl: '',
        })
    }

    public toggleMenu() {
        if(this.wrapper.nativeElement.classList.contains('toggled')){
            this.renderer.removeClass(this.wrapper.nativeElement, 'toggled');
        } else {
            this.renderer.addClass(this.wrapper.nativeElement, 'toggled');
        }
        
    }
    
    public submitForm() {
        console.log('value entred :', this.employeeForm.get('name').value);
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
                console.log(this.selectedEmployee);
            break;
        }
        
        this.modalFields.next(this.modal);

    }

    


}