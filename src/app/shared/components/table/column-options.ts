export interface ColumnOptions {
  name: string; //name of the column

  width: string; //width of the column

  key: string; //key in the response object for this column

  type: string; //type of the field

  editable: boolean; //column is editable or not
}
export const columns: ColumnOptions[] = [
  { name: 'Name', width: '150px', key: 'name', type: 'text', editable: true },

  { name: 'Email', width: '250px', key: 'email', type: 'email', editable: true }
];
