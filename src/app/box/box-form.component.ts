import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { BoxService } from "./box.service";
import { Router } from "@angular/router";
import { FormInputComponent } from "../form/form-input.component";
import { KeyValuePipe } from "@angular/common";

@Component({
  selector: 'app-box-form',
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    KeyValuePipe
],
  template: `
    <form class="max-w-sm mx-auto" [formGroup]="boxForm" (ngSubmit)="boxForm.valid && submitForm()">
      @for(field of formFields | keyvalue:null; track field) {
        <app-form-input [formGroup]="boxForm" [title]="field.value" [property]="field.key"></app-form-input>
      }
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Box</button>
    </form>
`
})
export class BoxFormComponent {
  private readonly boxService = inject(BoxService);
  private readonly router = inject(Router);

  formFields = {
    name: 'Box Name',
    slug: 'Box Slug URL',
    description: 'Box Description'
  };

  boxForm = new FormGroup({
    name: new FormControl('', Validators.required),
    slug:  new FormControl('', Validators.required),
    description:  new FormControl('', Validators.required)
  });

  submitForm(): void {
    this.boxService.createBox(this.boxForm.controls.name.value, this.boxForm.controls.slug.value, this.boxForm.controls.description.value).subscribe({
      next: (response) => {
        console.log('Box created successfully', response);
        this.router.navigate(['/box', response.slug]);
      }, error: (error) => {
        console.error('Error creating box', error);
      }, complete: () => {
        console.log('Box creation completed');
      }
    });
  }
}
