import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { ColumnFilterModel } from '../../types';

const columnNameFieldMap: Record<string, string> = {
  name: 'product_name',
  desc: 'product_desc',
  price: 'price',
  id: 'id',
};


const columnTypeFieldMap: Record<string, string> = {
  name: 'string',
  desc: 'string',
  price: 'number',
  id: 'number',
};


@Injectable()
export class TableDataService {
  public rawData: any;
  public originalData: any[] = [];

  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any> {
    return this.httpClient.get('./assets/table_data.json');
  }

  getTableData(): Observable<any> {
    return this.getData().pipe(
      map((response) => {
        this.rawData = response;
        this.originalData = Object.values(response);
        return this.originalData;
      })
    );
  }

  /**
   * 
   * TO DO: 
   * 1. Create a data structure - a Map which would maintain the list of operators that are permissible for a given data type. When it fails, restriction is done at the time of choosing in the filter form and errors are thrown citing the anomaly
   * 2. Implement a proper filter
   * 3. Implement loading and error for filters as well, since in the real world they would be api calls.
   * 
   * @param filters 
   * 
   * @returns 
   */
  getFilteredData(filters: any[]): Observable<any[]> | undefined {
    if (filters?.length) {
      let resultData: any[] = [...this.originalData];
      filters?.forEach((filter: ColumnFilterModel) => { 
        if(columnTypeFieldMap[filter.columnName] === 'string' && filter.operator in [' less than, less than or equal to', 'greater than', 'greater than equal to'])  {
          throw new Error(
            `${filter.columnName} Not a number type, please check the configuration/filter choices`
          );
        }      
        resultData = resultData.filter((item: any) => {
          console.log(
            'here specifically',
            item, filter,
            item[columnNameFieldMap[filter.columnName]],
            // item[columnNameFieldMap[filter.columnName]].includes(
            //   filter.searchText
            // ),
            filter.searchText
          );
          let condition;
          switch (columnTypeFieldMap[filter.columnName]) {
            case 'number':
              switch (filter.operator) {
                case 'equal to': {
                  condition =
                    item[columnNameFieldMap[filter.columnName]]?.toString() ===
                    filter.searchText.toString();
                  console.log('here', item[columnNameFieldMap[filter.columnName]]?.toString(), filter.searchText.toString(), condition);
                  break;
                }

                case 'not equal to':
                  condition =
                    item[columnNameFieldMap[filter.columnName]]?.toString() !==
                    filter.searchText.toString();
                  break;

                case 'less than':
                  if (
                    isNaN(item[columnNameFieldMap[filter.columnName]]) ||
                    isNaN(filter.searchText as any)
                  ) {
                    throw new Error(
                      `${filter.columnName} Not a number type, please check the configuration`
                    );
                  }
                  condition =
                    item[columnNameFieldMap[filter.columnName]] <
                    filter.searchText;
                  break;

                case 'less than or equal to':
                  if (
                    isNaN(item[columnNameFieldMap[filter.columnName]]) ||
                    isNaN(filter.searchText as any)
                  ) {
                    throw new Error(
                      `${filter.columnName} Not a number type, please check the configuration`
                    );
                  }
                  condition =
                    item[columnNameFieldMap[filter.columnName]] <=
                    filter.searchText;
                  break;

                case 'greater than':
                  if (
                    isNaN(item[columnNameFieldMap[filter.columnName]]) ||
                    isNaN(filter.searchText as any)
                  ) {
                    throw new Error(
                      `${filter.columnName} Not a number type, please check the configuration`
                    );
                  }
                  condition =
                    item[columnNameFieldMap[filter.columnName]] >
                    filter.searchText;
                  break;

                case 'greater than or equal to':
                  if (
                    isNaN(item[columnNameFieldMap[filter.columnName]]) ||
                    isNaN(filter.searchText as any)
                  ) {
                    throw new Error(
                      `${filter.columnName} Not a number type, please check the configuration`
                    );
                  }
                  condition =
                    item[columnNameFieldMap[filter.columnName]] >=
                    filter.searchText;
                  break;

                case 'contains':
                  condition = item[columnNameFieldMap[filter.columnName]]
                    ?.toString()
                    .includes(filter.searchText.toString());
                  break;

                case 'does not contain':
                  condition = !item[columnNameFieldMap[filter.columnName]]
                    ?.toString()
                    .includes(filter.searchText.toString());
                  break;
              }
              break;

            case 'string':
              switch (filter.operator) {
                case 'equal to':
                  condition =
                    item[columnNameFieldMap[filter.columnName]]?.toString() ===
                    filter.searchText.toString();
                  break;

                case 'not equal to':
                  condition =
                    item[columnNameFieldMap[filter.columnName]]?.toString() !==
                    filter.searchText.toString();
                  break;

                case 'less than':
                case 'less than or equal to':
                case 'greater than':
                case 'greater than or equal to':
                  throw new Error(
                    `${filter.columnName} Not a number type, please check the configuration`
                  );

                case 'contains':
                  condition = item[columnNameFieldMap[filter.columnName]]
                    ?.toString()
                    .includes(filter.searchText.toString());
                    if(item[columnNameFieldMap[filter.columnName]] === 'PIOGLITAZONEHYDROCHLORIDE') {
                      console.log('here', columnNameFieldMap[filter.columnName], filter.searchText);
                    }
                  break;

                case 'does not contain':
                  condition = !item[columnNameFieldMap[filter.columnName]]
                    ?.toString()
                    .includes(filter.searchText.toString());
                  break;
              }
              break;
          }

          return condition;
        });
      });
      // console.log(resultData.length);
      return of(resultData);
    } else {
      return undefined;
    }
  }
}
