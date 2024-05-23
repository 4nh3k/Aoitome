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
    <Table striped hoverable className="shadow rounded-lg bg-white">
      <Table.Head className="border-b">
        {headers.map((header, index) => (
          <Table.HeadCell className="bg-gray-200" key={index}>{header.label}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((item, indexRow) => (
          <Table.Row key={indexRow} className="hover:bg-[#edf1f5]">
            {headers.map((header, indexCell) => (
              <Table.Cell className={header.className } key={indexCell}>
                {item[header.prop]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
