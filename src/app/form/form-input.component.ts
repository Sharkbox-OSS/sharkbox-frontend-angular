import { Component, input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-form-input',
  imports: [
    ReactiveFormsModule,
  ],
  template: `
    <div [class]="wrapperClass()" [formGroup]="formGroup()">
      <label [for]="property()" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ title() }}</label>
      <input [id]="property()" [type]="type()" [formControlName]="property()" [autocomplete]="autoComplete()" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" />
    </div>
  `
})
export class FormInputComponent {
  title = input<string>('Input Label');
  property = input<string>('input');
  wrapperClass = input<string>('mb-5')
  autoComplete = input<boolean>(false);
  type = input<string>('text');
  formGroup = input<FormGroup>(new FormGroup({}));
}
