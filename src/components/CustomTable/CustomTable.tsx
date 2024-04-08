import { Table } from "flowbite-react";
import React from "react";

interface Header {
  label: string;
  prop: string;
  className?: string; // Add className property to Header interface
}

interface Data {
  [key: string]: React.ReactNode | string; // Allow data to be React node or text
}

interface CustomTableProps {
  headers: Header[];
  data: Data[];
}

export function CustomTable(props: CustomTableProps) {
  const { headers, data } = props;

  return (
    <Table className="shadow rounded-lg">
      <Table.Head className="border-b">
        {headers.map((header, index) => (
          <Table.HeadCell key={index}>{header.label}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((item, index) => (
          <Table.Row key={index}>
            {headers.map((header, index) => (
              <Table.Cell key={index} className={header.className}>
                {item[header.prop]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
