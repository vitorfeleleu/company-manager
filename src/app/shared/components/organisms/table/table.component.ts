import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  type TemplateRef,
  computed,
  contentChild,
  input,
} from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'guep-table',
  standalone: true,
  imports: [TableModule, NgTemplateOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  public emptyMessage = input('Nenhum registro encontrado');
  public gridData = input.required<unknown[]>();
  public loading = input(true);

  public headerTemplate =
    contentChild.required<TemplateRef<unknown>>('headerTemplate');
  public itemTemplate =
    contentChild.required<TemplateRef<unknown>>('itemTemplate');

  protected isGridData = computed(() => {
    if (this.gridData().length) {
      return true;
    }
    return false;
  });
}
