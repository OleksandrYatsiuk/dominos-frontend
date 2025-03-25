export interface ITableColumn {
    field: string;
    header: string;
    sortable?: boolean;
    width?: string;
    'flex-basis'?: string;
    frozen?: boolean;
    alignFrozen?: string;
    available?: boolean;
    conditions?: boolean[];
}
