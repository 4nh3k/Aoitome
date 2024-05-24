import { Table } from "flowbite-react";
import React from "react";

interface Header {
  label: string;
  prop: string;
  className?: string; // Add className property to Header interface
  isImage?: boolean; // Add isImage property to indicate if the column contains an image
}

interface Data {
  [key: string]: React.ReactNode | string; // Allow data to be React node or text
}

interface CustomTableProps {
  headers: Header[];
  data: Data[];
  onRowClick?: (item: Data, index: number) => void; // Define an optional onRowClick event handler
}

export function CustomTable(props: CustomTableProps) {
  const { headers, data, onRowClick } = props;

  const handleRowClick = (item: Data, index: number) => {
    if (onRowClick) {
      onRowClick(item, index);
    }
  };

  return (
    <Table striped hoverable className="shadow rounded-lg bg-white">
      <Table.Head className="border-b">
        {headers.map((header, index) => (
          <Table.HeadCell className="bg-gray-200" key={index}>{header.label}</Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((item, indexRow) => (
          <Table.Row key={indexRow} className={`hover:bg-[#edf1f5] ${onRowClick ? 'cursor-pointer' : ''}`} onClick={() => handleRowClick(item, indexRow)}>
            {headers.map((header, indexCell) => (
              <Table.Cell className={header.className} key={indexCell}>
                {header.isImage ? (
                  <img alt='profileimg' className="w-auto h-auto flex aspect-square rounded-lg bg-gray-50 object-cover" src={item[header.prop]} style={{ maxWidth: 64, height: 64 }} />
                ) : (
                  item[header.prop]
                )}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
