import Translation from '@/config/agGridTables'
import { GridApi } from 'ag-grid-community'

export default class AgGridFactory {
  public static getDefaultGridOptions() {
    return {
      defaultColDef: {
        editable: false,
        sortable: true,
        filter: true,
        resizable: true
      },
      localeText: Translation.localeTableText,
      suppressDragLeaveHidesColumns: true,
      onGridSizeChanged: ({ api }: { api: GridApi }) => {
        api.sizeColumnsToFit()
      }
    }
  }
  public static getActionColumn(params: any) {
    const width = Object.keys(params?.cellRendererParams ?? {}).length * 60 + 20
    return {
      headerName: 'Действия',
      pinned: 'right',
      colId: 'actions',
      maxWidth: width,
      width: width,
      filter: false,
      sortable: false,
      cellRendererFramework: 'ActionRenderer',
      ...params
    }
  }
}
