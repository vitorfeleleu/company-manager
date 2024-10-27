import {
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  ElementRef,
  Inject,
  Injector,
  type OnInit,
  Renderer2,
  effect,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  type ControlValueAccessor,
  FormControl,
  type FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  NgModel,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';

@Directive({
  selector: '[guepControlValueAccessor]',
  standalone: true,
})
export class ControlValueAccessorDirective<T>
  implements ControlValueAccessor, OnInit
{
  protected destroy = inject(DestroyRef);
  protected cd = inject(ChangeDetectorRef);
  protected elementRef = inject(ElementRef);
  protected renderer2 = inject(Renderer2);

  /**
   * Inputs default custom input
   */
  public isReadOnly = model(false);
  public optional = model(false);
  public inputId = input.required<string>();
  public label = input.required<string>();
  public loading = input(false);
  public placeHolderText = input<string>('');
  public errorName = input('errorDescription');

  /**
   * Variable directive
   */
  protected control!: FormControl;
  protected onTouched!: () => T;
  protected onChange!: (val: T | null) => T;
  protected disabled = signal(false);
  protected errorForm = signal('Campo obrigatório');

  protected ngOnInitExtends(): void {}

  constructor(@Inject(Injector) private injector: Injector) {
    effect(
      () => {
        this._updateEnableOrDisabled(this.isReadOnly());
      },
      { allowSignalWrites: true }
    );
    this._addClassInputComponent();
  }

  public ngOnInit(): void {
    this._setFormControl();
    this.ngOnInitExtends();
  }

  writeValue(value: T): void {}

  registerOnChange(fn: (val: T | null) => T): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => T): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected getChangeValueControl() {
    return this.control.valueChanges.pipe(takeUntilDestroyed(this.destroy));
  }

  private _setFormControl(): void {
    try {
      const formControl = this.injector.get(NgControl);
      formControl.valueAccessor = this;

      switch (formControl.constructor) {
        case NgModel: {
          this._setNgModel(formControl);
          break;
        }
        case FormControlName:
          this._setFormControlName(formControl);
          break;

        default:
          this._setDefaultControl(formControl);
          break;
      }
    } catch (err) {
      this.control = new FormControl();
    }
    this._checkControlRequired();
  }

  private _updateEnableOrDisabled(enableControl: boolean): void {
    this.disabled.set(enableControl);
  }

  private _setNgModel(formControl: NgControl): void {
    const { control, update } = formControl as NgModel;

    this.control = control;

    this.control.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroy),
        tap((value: string) => update.emit(value))
      )
      .subscribe();
  }

  private _setFormControlName(formControl: NgControl): void {
    this.control = this.injector
      .get(FormGroupDirective)
      .getControl(formControl as FormControlName);
  }

  private _setDefaultControl(formControl: NgControl): void {
    this.control = (formControl as FormControlDirective).form as FormControl;
  }

  private _addClassInputComponent(): void {
    this.renderer2.addClass(
      this.elementRef.nativeElement,
      'label-input-global-style'
    );
  }

  private _checkControlRequired(): void {
    this.optional.set(!this.control.hasValidator(Validators.required));
  }
}
