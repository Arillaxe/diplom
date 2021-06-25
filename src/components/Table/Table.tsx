import { forwardRef, useRef, useEffect } from 'react';
import { useTable, useRowSelect } from 'react-table';
import { Checkbox } from 'evergreen-ui';

import './styles.css';

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate])

    return (
      <>
        <Checkbox className="table-checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const Table = (props: any) => {
  const { columns, data, onRowSelect } = props;

  const tableInstance: any = useTable({ columns, data }, useRowSelect, (hooks) => hooks.visibleColumns.push((columns) => [
    {
      id: 'selection',
      Header: ({ getToggleAllRowsSelectedProps }: any) => (
        <div>
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>
      ),
      Cell: ({ row }: any) => (
        <div>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>
      ),
    },
    ...columns,
  ]));

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleRowSelected,
  } = tableInstance;

  useEffect(() => {
    onRowSelect(selectedFlatRows.map((r: any) => r.original));
  }, [selectedFlatRows]);

  const selectRow = (id: string) => (e: any) => {
    if (e.target.type === 'checkbox' || e.target.tagName === 'path' || e.target.className === 'table-checkbox' || e.target.tagName === 'svg') return;
    toggleRowSelected(id);
  };

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup: any) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row);

          return (
            <tr onClick={selectRow(row.id)}  {...row.getRowProps()}>
              {row.cells.map((cell: any) => (
                <td {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
