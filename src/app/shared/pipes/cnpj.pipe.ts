import { Pipe, type PipeTransform } from '@angular/core';
import { formatCnpj } from '@shared/utils/cnpj.utils';

@Pipe({
  name: 'cnpj',
  standalone: true,
})
export class CnpjPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';

    const onlyNumbers = value.toString().replace(/\D/g, '');

    if (onlyNumbers.length === 14) {
      return formatCnpj(onlyNumbers);
    }

    return value.toString();
  }
}
