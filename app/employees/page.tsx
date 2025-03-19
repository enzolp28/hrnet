'use client';

import EmployeeList from '../components/EmployeeList';

export default function EmployeesPage() {

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Current Employees</h1>
        <EmployeeList />
      </div>
    </main>
  );
}
