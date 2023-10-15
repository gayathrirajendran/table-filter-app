export interface ColumnDefinition<T> {
    id: string;
    type: T;
}
export interface TableConfigModel {
    columnDefinition: ColumnDefinition<any>[];
}