export interface GenericFilterModel {
    searchText: string | number | Date; // will scale
}

export const OPERATOR_TYPES = ['equal to', 'not equal to', 'less than', 'less than or equal to', 'greater than', 'greater than or equal to', 'contains', 'does not contain'];

export interface ColumnFilterModel extends GenericFilterModel {
    columnId: string;
    columnName: string;
    operator: string;
}