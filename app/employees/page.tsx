'use client';

import EmployeeList from '../components/EmployeeList';
import { useEmployees } from '../context/EmployeeContext';

export default function EmployeesPage() {
  const { employees } = useEmployees();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Current Employees</h1>
        <EmployeeList employees={employees} />
      </div>
    </main>
  );
}
