import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { StandardPageComponent } from '@shared/components/organisms/standard-page/standard-page.component';
import { CompanyFormTemplateComponent } from '@shared/components/templates/company-form-template/company-form-template.component';

@Component({
  selector: 'guep-company-form',
  standalone: true,
  imports: [StandardPageComponent, CompanyFormTemplateComponent],
  templateUrl: './company-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormComponent {
  public id = input('');

  protected titlePage = computed(() => {
    if (this.id()) {
      return 'Editar';
    }
    return 'Cadastro';
  });
}
