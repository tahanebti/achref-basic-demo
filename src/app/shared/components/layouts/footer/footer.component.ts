import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  
  public year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

  onMenu() {
    //this.dialogService.formAddress();
  }

  onSignUp() {
    //this.dialogService.signUp();
  }

  onSignIn() {
    //this.dialogService.signIn();
  }

  onFormAddress() {
    //this.dialogService.formAddress();
  }

  onSelectAddress() {
    //this.dialogService.selectAddress();
  }

  onBillingDetails() {
    //this.dialogService.billingDetails();
  }

  onSchedule() {
    //this.dialogService.schedule();
  }

}
