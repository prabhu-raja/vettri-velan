import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-dashboard',
  templateUrl: './angular-dashboard.component.html',
  styleUrls: ['./angular-dashboard.component.scss']
})
export class AngularDashboardComponent implements OnInit {
  empNumber = 1;
  constructor() { }

  // ngOnInit() {
  //   const employeeOne = this.getEmployee('Robin', 'Canada');
  //   this.empNumber = 100;
  //   const employeeTwo = this.getEmployee('James', 'Italy');
  //   const employees = [employeeOne, employeeTwo];
  //   console.log(employees);
  // }

  // getEmployee(empName, empCountry) {
  //   return {
  //     employeeNumber: this.empNumber++,
  //     employeeName: empName,
  //     employeeCountry: empCountry
  //   };
  // }

/**
 * ! The new function became a higher-order function, because the first time calling it returns a function.
 * ! This returned function can be used to create our employee as we did before.
 * ! However, since the surrounding function creates a stateful environment around the returned function
 * ! -- in this case the stateful employee number -- it is called a closure.
 */

// ! "Closures are functions that refer to independent (free) variables.
// ! In other words, the function defined in the closure 'remembers' the environment in which it was created."

  ngOnInit() {
    const getEmployee = this.getEmployeeFactory();
    const employeeOne = getEmployee('Robin', 'Canada');
    const employeeTwo = getEmployee('James', 'Italy');
    const employees = [employeeOne, employeeTwo];
    console.log(employees);
  }

  getEmployeeFactory() {
    return (empName, empCountry) => {
      return {
        employeeNumber: this.empNumber++,
        employeeName: empName,
        employeeCountry: empCountry
      };
    };
  }

}
