'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useEmployees } from '../context/EmployeeContext';

interface Employee {
  firstName: string;
  lastName: string;
  startDate: string;
  department: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Column {
  key: keyof Employee;
  label: string;
}

const columns: Column[] = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'department', label: 'Department' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
  { key: 'street', label: 'Street' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'zipCode', label: 'Zip Code' },
];

export default function EmployeeList() {
  const { employees } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage des employés
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      Object.values(employee).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [employees, searchTerm]);

  // Tri des employés
  const sortedEmployees = useMemo(() => {
    if (!sortConfig) return filteredEmployees;

    return [...filteredEmployees].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredEmployees, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedEmployees.length / entriesPerPage); //Math.ceil arrondit un nombre à l'entier supérieur
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Gestionnaires d'événements
  const handleSort = (key: keyof Employee) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full p-4">
      <div className="mb-4 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
        <Link href="/" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full md:w-auto text-center md:text-left">
          ← Return to Form
        </Link>
        <div className="flex flex-wrap gap-4 justify-between md:justify-end w-full md:w-auto">
          <div className="flex items-center">
            <label className="mr-2 whitespace-nowrap">Show entries:</label>
            <select
              className="border rounded p-1"
              value={entriesPerPage}
              onChange={handleEntriesPerPageChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2">Search:</label>
            <input
              type="text"
              className="border rounded p-1 w-full min-w-[150px]"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.label}
                    {sortConfig?.key === column.key && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee, index) => (
              <tr
                key={index}
                className={`border-t ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100`}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-2">
                    {employee[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * entriesPerPage + 1} to{' '}
          {Math.min(currentPage * entriesPerPage, sortedEmployees.length)} of{' '}
          {sortedEmployees.length} entries
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
