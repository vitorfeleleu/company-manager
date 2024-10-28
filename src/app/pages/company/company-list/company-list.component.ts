import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StandardPageComponent } from '@shared/components/organisms/standard-page/standard-page.component';
import { CompanyListTemplateComponent } from '@shared/components/templates/company-list-template/company-list-template.component';

@Component({
  selector: 'guep-company-list',
  standalone: true,
  imports: [StandardPageComponent, CompanyListTemplateComponent],
  templateUrl: './company-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListComponent {}
