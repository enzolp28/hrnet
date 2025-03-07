
'use client';

import Link from 'next/link';
import EmployeeForm from './components/EmployeeForm';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">HRnet</h1>
          <div className="mb-8">
            <Link 
              href="/employees"
              className="text-green-600 hover:text-green-700 font-medium hover:underline"
            >
              View Current Employees
            </Link>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Create Employee</h2>
          <EmployeeForm />
        </div>
      </div>
    </div>
  );
}
