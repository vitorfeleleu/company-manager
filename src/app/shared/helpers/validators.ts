import type {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { validatorCNPJReturn } from './functions';

export function validadorCNPJ(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validatorCNPJReturn(control);
  };
}
