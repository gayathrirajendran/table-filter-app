import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ColumnDefinition, ColumnFilterModel, OPERATOR_TYPES } from 'src/types';

interface FilterFormModel {
  columnId: FormControl<string | null>;
  columnName: FormControl<string | null>;
  operator: FormControl<string | null>;
  searchText: FormControl<string | null>;
}

@Component({
  selector: 'app-custom-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.scss'],
})
export class CustomFilterComponent implements OnInit {
  @Input({ required: true }) filterConfig: ColumnDefinition<any>[] = [];
  @Output() filterChange: EventEmitter<Array<any>> = new EventEmitter();

  // public filterForm: FormArray<FormGroup<FilterFormModel>> = new FormArray([] as any);
  public filterFormGroup = new FormGroup({
    filters: new FormArray<FormGroup<FilterFormModel>>([]),
  });

  public operators = OPERATOR_TYPES;

  public destroy$ = inject(DestroyRef);

  ngOnInit(): void {}

  setupListeners(index: number): void {
    this.filterForm
      ?.at(index)
      .get('columnName')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: (response) => {
          // console.log('Response', response);
          // restrict operator types based on column name and its type.
          // this.filterConfig.find((item) => item.id === response)?.type
        },
        error: (err) => {
          console.log('Error', err);
        },
      });
  }

  get filterForm(): FormArray<FormGroup<FilterFormModel>> {
    return this.filterFormGroup.get('filters') as FormArray<
      FormGroup<FilterFormModel>
    >;
  }

  getNewFilter(): FormGroup<FilterFormModel> {
    return new FormGroup<FilterFormModel>({
      columnId: new FormControl(''),
      columnName: new FormControl('', [Validators.required]),
      operator: new FormControl('', [Validators.required]),
      searchText: new FormControl('', [Validators.required]),
    });
  }

  addFilter(): void {
    this.filterForm.push(this.getNewFilter());
    this.setupListeners(this.filterForm.length - 1);
  }

  deleteFilter(index: any): void {
    this.filterForm.removeAt(index);
    this.filterChange.emit(
      this.filterFormGroup.value.filters?.length
        ? this.filterFormGroup.value.filters
        : []
    );
  }

  submitFilter(): void {
    if (!this.filterFormGroup.valid) {
      this.filterFormGroup.markAllAsTouched();
    } else {
      this.filterChange.emit(this.filterFormGroup.value.filters);
    }
  }
}
