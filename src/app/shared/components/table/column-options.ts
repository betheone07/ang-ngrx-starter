export interface ColumnOptions {
  name: string; //name of the column

  width: string; //width of the column

  key: string; //key in the response object for this column

  editable: boolean; //column is editable or not

  readonly?: boolean;
}
export const columns: ColumnOptions[] = [
  { name: 'Name', width: '150px', key: 'name', editable: true },

  { name: 'Email', width: '250px', key: 'email', editable: true }
];
