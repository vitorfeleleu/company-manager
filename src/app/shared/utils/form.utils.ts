import {
  type AbstractControl,
  type FormControl,
  UntypedFormArray,
  type UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

export function markFormAsDirty(form: UntypedFormGroup) {
  Object.keys(form.controls).forEach((key) => {
    markControlAsDirty(form.controls[key]);
  });
}

export function markControlAsDirty(control: AbstractControl) {
  control.markAsDirty();
  control.markAsTouched();

  if (control instanceof UntypedFormGroup) {
    markFormAsDirty(control);
  } else if (control instanceof UntypedFormArray) {
    control.controls.forEach((element) => markControlAsDirty(element));
  }
}

export function formViolationReset(
  formGroup: UntypedFormGroup | UntypedFormArray
) {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);

    if (control) {
      controlViolationReset(control);
    }
    if (
      control instanceof UntypedFormGroup ||
      control instanceof UntypedFormArray
    ) {
      formViolationReset(control);
    }
  });
}

export function controlViolationReset(
  formControl: UntypedFormControl | FormControl | AbstractControl
) {
  formControl?.markAsDirty();
  formControl?.markAsPristine();
}
