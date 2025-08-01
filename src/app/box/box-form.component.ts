import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { BoxService } from "./box.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-box-form',
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <form class="max-w-sm mx-auto" [formGroup]="boxForm" (ngSubmit)="boxForm.valid && submitForm()">
      <div class="mb-5">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Box Name</label>
        <input autocomplete="false" type="text" id="name" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required formControlName="name" />
      </div>
      <div class="mb-5">
        <label for="slug" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Box URL slug</label>
        <input autocomplete="false" type="text" id="slug" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required formControlName="slug" />
      </div>
      <div class="mb-5">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Box Description</label>
        <input autocomplete="false" type="text" id="description" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required formControlName="description" />
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Box</button>
    </form>
`
})
export class BoxFormComponent {
  private readonly boxService = inject(BoxService);
  private readonly router = inject(Router);

  boxForm = new FormGroup({
    name: new FormControl(''),
    slug:  new FormControl(''),
    description:  new FormControl('')
  });

  submitForm(): void {
    this.boxService.createBox(this.boxForm.value.name, this.boxForm.value.slug, this.boxForm.value.description).subscribe({
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
