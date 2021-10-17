import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Manager } from "./model/manager";
import { ManagerService } from "./shared/manager.service";

@Component({
    selector: 'manager',
    templateUrl: 'manager.component.html',
})

export class ManagerComponent implements OnInit {
    
    public managers: Manager[];
    public selectedManager: Manager;

    constructor(private managerService: ManagerService){
    }

    ngOnInit() {
        this.managerService.getManagers().subscribe( managers => {
            this.managers = managers;
        });
    }

    updateManager(manager: Manager) {
       this.selectedManager = manager;
    }
}