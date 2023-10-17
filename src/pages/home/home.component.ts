import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../components/layout/layout.component';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { CustomFilterComponent } from '../../components/custom-filter/custom-filter.component';
import { of } from 'rxjs';
import { TableConfigModel } from '../../types';
import { ColumnCellDirective } from '../../directives/column-cell/column-cell.directive';
import { ColumnHeaderDirective } from '../../directives/column-header/column-header.directive';
import { TableDataService } from '../../services/table-data/table-data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    CustomTableComponent,
    CustomFilterComponent,
    ColumnCellDirective,
    ColumnHeaderDirective,
    HttpClientModule
  ],
  providers: [TableDataService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public filters: any;
  public originalData: any;
  public configuration: TableConfigModel = {
    columnDefinition: [
      {
        id: 'id',
        type: 'number'
      },
      {
        id: 'name',
        type: 'string',
      },
      {
        id: 'desc',
        type: 'string',
      },
      {
        id: 'price',
        type: 'string',
      },
    ],
  };

  public dataService = inject(TableDataService);

  ngOnInit(): void {}

  filterData(filterValue: any): void {
    this.filters = filterValue;
  }
}
