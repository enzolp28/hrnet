'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { mockEmployees } from '../data/mockEmployees';

interface Employee {
  id?: string; // Optionnel pour la compatibilité avec les nouveaux employés ajoutés
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

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export function EmployeeProvider({ children }: { children: ReactNode }) {

  // Stocke la liste des employés
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);

  const addEmployee = (employee: Employee) => {
    // Générer un ID unique si non fourni
    const employeeWithId = {
      ...employee,
      id: employee.id || `emp${Date.now().toString()}`
    };
    const newEmployees = [...employees, employeeWithId];
    setEmployees(newEmployees);
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
}
