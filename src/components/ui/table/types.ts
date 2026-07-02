export interface DataTableColumn<Row = Record<string, any>> {
  /** Key into the row. Supports nested paths, e.g. "SUPERADMIN.name". */
  key: string;
  /** Column header label. */
  header: string;
  /** Optional alignment for the cell + header. */
  align?: "left" | "center" | "right";
  /** Optional formatter for the raw value. Ignored when a #cell-<key> slot is provided. */
  format?: (value: any, row: Row) => unknown;
  /** Optional extra classes for the body cells in this column. */
  cellClass?: string;
  /** Optional fixed width, e.g. "80px". */
  width?: string;
}
