import React from 'react';

interface Column {
  header: string;
  accessor: string;
  cell?: (item: any) => React.ReactNode;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
}

const AdminTable: React.FC<AdminTableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.accessor} className="px-6 py-4">
                    {column.cell ? (
                      column.cell(item)
                    ) : (
                      <div className="text-sm text-gray-900">
                        {item[column.accessor]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;