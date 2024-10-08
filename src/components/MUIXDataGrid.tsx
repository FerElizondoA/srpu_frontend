import { ThemeProvider, createTheme } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import { DataGrid, GridToolbar, esES as gridEsES } from "@mui/x-data-grid";
import * as React from "react";

const theme = createTheme(coreEsES, gridEsES);

export default function MUIXDataGrid(props: any) {
  const [pageSize, setPageSize] = React.useState(25);

  const changePageSize = (v: number) => {
    setPageSize(v);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <DataGrid
          sx={{
            fontFamily: "MontserratMedium",
          }}
          getRowHeight={() => "auto"}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
              label: "Buscar",
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          localeText={{
            noRowsLabel: "Sin filas",
            noResultsOverlayLabel: "Resultados no encontrados",
            errorOverlayDefaultLabel: "Ha ocurrido un error.",
            toolbarDensity: "Densidad",
            toolbarDensityLabel: "Densidad",
            toolbarDensityCompact: "Compacta",
            toolbarDensityStandard: "Standard",
            toolbarDensityComfortable: "Comoda",

            // Columns selector toolbar button text
            toolbarColumns: "Columnas",
            toolbarColumnsLabel: "Seleccionar columnas",

            // Filters toolbar button text
            toolbarFilters: "Filtros",
            toolbarFiltersLabel: "Mostrar filtros",
            toolbarFiltersTooltipHide: "Ocultar filtros",
            toolbarFiltersTooltipShow: "Mostrar filtros",
            toolbarFiltersTooltipActive: (count) =>
              count > 1 ? `${count} filtros activos` : `${count} filtro activo`,

            // Quick filter toolbar field
            toolbarQuickFilterPlaceholder: "Buscar…",
            toolbarQuickFilterLabel: "Buscar",
            toolbarQuickFilterDeleteIconLabel: "Limpiar",

            // Export selector toolbar button text
            toolbarExport: "Exportar",
            toolbarExportLabel: "Exportar",
            toolbarExportCSV: "Descargar como CSV",
            toolbarExportPrint: "Imprimir",
            toolbarExportExcel: "Descargar como Excel",

            // Columns panel text
            columnsPanelTextFieldLabel: "Columna de búsqueda",
            columnsPanelTextFieldPlaceholder: "Título de columna",
            columnsPanelDragIconLabel: "Reorder columna",
            columnsPanelShowAllButton: "Mostrar todo",
            columnsPanelHideAllButton: "Ocultar todo",

            // Filter panel text
            filterPanelAddFilter: "Agregar filtro",
            filterPanelDeleteIconLabel: "Borrar",
            filterPanelLinkOperator: "Operador lógico",
            filterPanelOperators: "Operadores",

            // TODO v6: rename to filterPanelOperator
            filterPanelOperatorAnd: "Y",
            filterPanelOperatorOr: "O",
            filterPanelColumns: "Columnas",
            filterPanelInputLabel: "Valor",
            filterPanelInputPlaceholder: "Valor de filtro",

            // Filter operators text
            filterOperatorContains: "contiene",
            filterOperatorEquals: "es igual",
            filterOperatorStartsWith: "comienza con",
            filterOperatorEndsWith: "termina con",
            filterOperatorIs: "es",
            filterOperatorNot: "no es",
            filterOperatorAfter: "es posterior",
            filterOperatorOnOrAfter: "es en o posterior",
            filterOperatorBefore: "es anterior",
            filterOperatorOnOrBefore: "es en o anterior",
            filterOperatorIsEmpty: "está vacío",
            filterOperatorIsNotEmpty: "no esta vacío",
            filterOperatorIsAnyOf: "es cualquiera de",

            // Filter values text
            filterValueAny: "cualquiera",
            filterValueTrue: "verdadero",
            filterValueFalse: "falso",

            // Column menu text
            columnMenuLabel: "Menú",
            columnMenuShowColumns: "Mostrar columnas",
            columnMenuFilter: "Filtro",
            columnMenuHideColumn: "Ocultar",
            columnMenuUnsort: "Desordenar",
            columnMenuSortAsc: "Ordenar ASC",
            columnMenuSortDesc: "Ordenar DESC",

            // Column header text
            columnHeaderFiltersTooltipActive: (count) =>
              count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
            columnHeaderFiltersLabel: "Mostrar filtros",
            columnHeaderSortIconLabel: "Ordenar",

            // Rows selected footer text
            footerRowSelected: (count) =>
              count > 1
                ? `${count.toLocaleString()} filas seleccionadas`
                : `${count.toLocaleString()} fila seleccionada`,

            // Total row amount footer text
            footerTotalRows: "Filas Totales:",

            // Total visible row amount footer text
            footerTotalVisibleRows: (visibleCount, totalCount) =>
              `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

            // Checkbox selection text
            checkboxSelectionHeaderName: "Seleccionar casilla",
            checkboxSelectionSelectAllRows: "Seleccionar todas las filas",
            checkboxSelectionUnselectAllRows: "Deseleccionar todas las filas",
            checkboxSelectionSelectRow: "Seleccionar fila",
            checkboxSelectionUnselectRow: "Deseleccionar fila",

            // Boolean cell text
            booleanCellTrueLabel: "si",
            booleanCellFalseLabel: "no",

            // Actions cell more text
            actionsCellMore: "más",

            // Column pinning text
            pinToLeft: "Anclar a la izquierda",
            pinToRight: "Anclar a la derecha",
            unpin: "Desanclar",

            // Tree Data
            treeDataGroupingHeaderName: "Grupo",
            treeDataExpand: "mostrar hijos",
            treeDataCollapse: "ocultar hijos",

            // Grouping columns
            groupingColumnHeaderName: "Grupo",
            groupColumn: (name) => `Agrupar por ${name}`,
            unGroupColumn: (name) => `No agrupar por ${name}`,

            // Master/detail
            detailPanelToggle: "Alternar detalle",
            expandDetailPanel: "Expandir",
            collapseDetailPanel: "Contraer",

            // Row reordering text
            rowReorderingHeaderName: "Reordenar filas",

            // Aggregation
            aggregationMenuItemHeader: "Agregación",
            aggregationFunctionLabelSum: "sum",
            aggregationFunctionLabelAvg: "avg",
            aggregationFunctionLabelMin: "min",
            aggregationFunctionLabelMax: "max",
            aggregationFunctionLabelSize: "tamaño",
          }}
          columns={props.columns}
          rows={props.rows}
          getRowId={(row) => (row.Id ? row.Id : row.id)}
          pageSize={pageSize}
          rowsPerPageOptions={[25, 50, 100]}
          onPageSizeChange={(v) => changePageSize(v)}
        />
      </ThemeProvider>
    </>
  );
}
