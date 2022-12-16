/* eslint-disable react/jsx-key */
import styled from 'styled-components';
import { useTable } from 'react-table';
function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });
  // Render the UI for your table
  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    onClick={() => {
                      // console.log(cell.value);
                      console.log(location);
                      if (cell.column['Header'] == '이미지' && cell.value != null) {
                        window.open(
                          'http://' + window.location.hostname + ':3000/img/' + cell.value
                        );
                      }
                    }}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
}

export default Table;

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  margin-top: 2%;
  td,
  th {
    height: 35px;
    vertical-align: middle;
    text-align: center;
  }

  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
  @media (max-width: 880px) {
    font-size: 13px;
  }
  @media (max-width: 880px) {
    font-size: 10px;
  }
  /* @media (max-width: 460px) {
    width: 10px;
  } */
`;
