import React from "react";

export interface Column {
  header: string,
  render: (val: any) => React.ReactNode
}

interface Props {
  data: any[],
  columns: Column[]
}

export default function Table(props: Props) {

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            {props.columns.map((column) => {
              return <th key={column.header}>
                {column.header}
              </th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((element, index) => {
            return (
              <tr key={element.id}>
                {props.columns.map((column) => {
                  return <td key={column.header}>{column.render(element)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
