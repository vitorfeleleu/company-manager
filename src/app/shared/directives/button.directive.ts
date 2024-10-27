import {
  type AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Renderer2,
  ViewContainerRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';

@Directive({
  selector: '[guepButton]',
  standalone: true,
})
export class ButtonDirective implements AfterViewInit {
  protected renderer = inject(Renderer2);
  protected cd = inject(ChangeDetectorRef);
  protected view = inject(ViewContainerRef);
  protected elementRef = inject(ElementRef);

  public severity = input<
    'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger'
  >('primary');
  public template = input<'default' | 'text' | 'outlined'>('default');
  public loading = input(false);

  private _loadingContent = signal<ElementRef | undefined>(undefined);

  constructor() {
    effect(
      () => {
        this._updateLoading(this.loading());
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit(): void {
    this._addClassButtonComponent();
  }

  private _addClassButtonComponent() {
    this._setClass(this.severity());
    this._setClass(`button-${this.template()}`);
  }

  private _setClass(className: string) {
    this.renderer.addClass(this.elementRef.nativeElement, className);
  }

  private _updateLoading(value: boolean): void {
    if (value) {
      this._addLoading();
    } else {
      this._removeLoading();
    }
  }

  private _addLoading(): void {
    this._loadingContent.set(this.renderer.createElement('span'));
    this.renderer.addClass(this._loadingContent(), 'loading-button');
    this.renderer.appendChild(
      this.elementRef.nativeElement,
      this._loadingContent()
    );
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'disabled',
      'true'
    );
  }

  private _removeLoading(): void {
    if (this._loadingContent()) {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
      this.renderer.removeChild(
        this.elementRef.nativeElement,
        this._loadingContent()
      );
    }
  }
}
