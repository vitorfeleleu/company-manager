import type { AbstractControl } from '@angular/forms';

export function validatorCNPJReturn(control: AbstractControl) {
  const cnpj = control.value?.replace(/[^\d]+/g, '');
  if (
    control.value === '' ||
    control.value === null ||
    control.value === undefined
  )
    return null;

  if (cnpj?.length !== 14) return { invalidCnpj: 'CNPJ inválido' };

  if (
    cnpj === '00000000000000' ||
    cnpj === '11111111111111' ||
    cnpj === '22222222222222' ||
    cnpj === '33333333333333' ||
    cnpj === '44444444444444' ||
    cnpj === '55555555555555' ||
    cnpj === '66666666666666' ||
    cnpj === '77777777777777' ||
    cnpj === '88888888888888' ||
    cnpj === '99999999999999'
  )
    return { invalidCnpj: 'CNPJ inválido' };

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number.parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number.parseInt(digitos.charAt(0)))
    return { invalidCnpj: 'CNPJ inválido' };

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number.parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number.parseInt(digitos.charAt(1)))
    return { invalidCnpj: 'CNPJ inválido' };

  return null;
}
