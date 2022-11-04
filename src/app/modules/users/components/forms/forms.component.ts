import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from 'src/app/core/services/person.service';
import { SnackbarComponent } from 'src/app/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  public frm!: FormGroup;

  jobs: any[] = [
    {value: 'job-0', viewValue: 'ERP Enginneer'},
    {value: 'job-1', viewValue: 'Cloud Architect'},
    {value: 'job-2', viewValue: 'SAP Consultant'},
  ];

  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private userService: PersonService,
    public snack: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeForm();
  }

  openSnack(data: any) {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data: data },
      duration: 3000
    });
  }

  private initializeForm() {
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;

    this.frm = this.fb.group({
      name: new FormControl(IS_EDITING ? data.name : null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(IS_EDITING ? data.email : null, [Validators.required, Validators.minLength(3)]),
      position: new FormControl(IS_EDITING ? data.position : null, [Validators.required, Validators.minLength(1)]),
      phone: new FormControl(IS_EDITING ? data.gender : null, [Validators.required]),
      id: new FormControl(IS_EDITING ? data.id : null)
    });
  }

  public save(form: FormGroup) {
    this.userService.create(form.value).subscribe((data: any) => {
      this.openSnack(data);

      if (data.success) {
        this.dialogRef.close(true);
      }
    });
  }

  public getNameErrorMessage() {
   // return this.frm.controls.name.hasError('required') ? 'name is required' :
    //  this.frm.controls.name.hasError('minlength') ? 'Al menos 2 caracteres' : '';
  }

  public getLastNameErrorMessage() {
   // return this.frm.controls.last_name.hasError('required') ? 'Last name is required' :
    //  this.frm.controls.name.hasError('minlength') ? 'Al menos 2 caracteres' : '';
  }

  public getAgeErrorMessage() {
   // return this.frm.controls.age.hasError('required') ? 'Age is required' :
    //  this.frm.controls.age.hasError('minlength') ? 'Al menos un numero debe ser ingresado' : '';
  }

  public getGenderErrorMessage() {
   // return this.frm.controls.gender.hasError('required') ? '' : '';
  }

}