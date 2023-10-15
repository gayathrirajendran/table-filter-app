import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnHeaderDirective } from '../../directives/column-header/column-header.directive';
import { ColumnCellDirective } from '../../directives/column-cell/column-cell.directive';
import { Observable, catchError, map, mapTo, of, throwError } from 'rxjs';
import { TableConfigModel } from '../../types';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule, ColumnHeaderDirective, ColumnCellDirective],
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent implements AfterContentInit, OnChanges {
  @Input({ required: true }) configuration: TableConfigModel | undefined;

  @Input({ required: true }) dataSource: Observable<any[]> | undefined;
  @Input() filterSource: Observable<any[]> | undefined;
  public dataError: any;
  public data$: Observable<any> | undefined;
  public recordLen: number = 0;

  public isLoading: boolean = false;

  @ContentChildren(ColumnHeaderDirective)
  public readonly columnHeaderTemplateList:
    | QueryList<ColumnHeaderDirective>
    | undefined;

  @ContentChildren(ColumnCellDirective) public readonly cellTemplateList:
    | QueryList<ColumnCellDirective>
    | undefined;

  public headerLookup: { [key: string]: ColumnHeaderDirective } | undefined;
  public cellLookup: { [key: string]: ColumnCellDirective } | undefined;

  ngOnInit(): void {
    this.data$ = this.dataSource?.pipe(
      (res: any) => {
        this.recordLen = res.length;
        return res;
      },
      catchError((err: any, caught: any) => {
        this.dataError = { message: 'Error has occurred' };
        return of(err);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.hasOwnProperty('filterSource')) {
      if (this.filterSource) {
        this.data$ = this.filterSource?.pipe(
          (res: any) => {
            this.recordLen = res.length;
            return res;
          },
          catchError((err: any, caught: any) => {
            this.dataError = { message: 'Error has occurred' };
            return of(err);
          })
        );
      } else {
        this.ngOnInit();
      }
    }
  }

  ngAfterContentInit(): void {
    if (this.columnHeaderTemplateList?.length) {
      this.headerLookup = this.constructLookup(this.columnHeaderTemplateList);
    }
    if (this.cellTemplateList?.length) {
      this.cellLookup = this.constructLookup(this.cellTemplateList);
    }
  }

  private constructLookup(list: QueryList<any>): any {
    const masterArray = list.toArray();
    let mapped = masterArray.map((item) => ({ [item.templateId]: item }));
    let lookup = Object.assign({}, ...mapped);
    // console.log(lookup);
    return lookup;
  }
}
