'use client';

import { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
// import Modal from './Modal';
import  {Modal}  from 'enzo-ts-rc';
// import { Modal} from 'enzolp-p14-react-library';
import { Button } from 'enzolp-p14-react-library'
import { states } from '../data/states';
import Select from './Select';

const departments = [
  { value: 'Sales', label: 'Sales' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Legal', label: 'Legal' }
];

const stateOptions = states.map(state => ({
  value: state.abbreviation,
  label: state.name
}));

export default function EmployeeForm() {
  const [showModal, setShowModal] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const fieldMap: { [key: string]: string } = {
      'first-name': 'firstName',
      'last-name': 'lastName',
      'date-of-birth': 'dateOfBirth',
      'start-date': 'startDate',
      'zip-code': 'zipCode',
      'street': 'street',
      'city': 'city'
    };

    const fieldName = fieldMap[id] || id;
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const { addEmployee } = useEmployees();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEmployee = {
      ...formData,
      state: selectedState,
      department: selectedDepartment
    };

    // Ajouter le nouvel employé via le Context
    addEmployee(newEmployee);
    
    // Réinitialiser le formulaire
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: ''
    });
    setSelectedState('');
    setSelectedDepartment('');
    
    setShowModal(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="date-of-birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
        </div>
        <Button />
        <fieldset className="border rounded-md p-4">
          <legend className="text-lg font-medium text-gray-700 px-2">Address</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Street
              </label>
              <input
                type="text"
                id="street"
                value={formData.street}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>

          
              <Select
                id="state"
                label="State"
                options={stateOptions}
                value={selectedState}
                onChange={setSelectedState}
              />
            

            <div>
              <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="number"
                id="zip-code"
                value={formData.zipCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </fieldset>
          
          <Select
            id="department"
            label="Department"
            options={departments}
            value={selectedDepartment}
            onChange={setSelectedDepartment}
          />
        

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </form>

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Success!"
          message="Employee Created!"
        />
      )}
    </div>
  );
}
