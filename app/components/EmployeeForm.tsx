'use client';

import { useState } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import  { Modal }  from 'enzo-ts-rc';
// import { Modal} from 'enzolp-p14-react-library';
// import { Button } from 'enzolp-p14-react-library'
import { states } from '../data/states';
import Select from './Select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

// Define the Zod schema for form validation
const employeeSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  dateOfBirth: z.string().refine(val => {
    const date = new Date(val);
    const today = new Date();
    return date < today && date > new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  }, { message: "Please enter a valid date of birth" }),//verifie que la date de naissance est dans le passé et à -100ans
  startDate: z.string().refine(val => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, { message: "Please enter a valid start date" }),//verifie que la date de début est au bon format
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().regex(/^\d{5}$/, { message: "Zip code must be 5 digits" }),
  department: z.string().min(1, { message: "Department is required" })
});

// Type for the form data based on the schema
type EmployeeFormData = z.infer<typeof employeeSchema>;

export default function EmployeeForm() {
  const [showModal, setShowModal] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  
  // Initialize react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: ''
    }
  });

  // Update form values when select components change
  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setValue('state', value, { shouldValidate: true });
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setValue('department', value, { shouldValidate: true });
  };

  const { addEmployee } = useEmployees();

  // Form submission handler with validation
  const onSubmit = (data: EmployeeFormData) => {
    // Add the new employee via Context
    addEmployee(data);
    
    // Reset the form
    reset();
    setSelectedState('');
    setSelectedDepartment('');
    
    // Show success modal
    setShowModal(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              {...register('firstName')}
              className={`mt-1 block w-full rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-green-500`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              {...register('lastName')}
              className={`mt-1 block w-full rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-green-500`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="date-of-birth"
              {...register('dateOfBirth')}
              className={`mt-1 block w-full rounded-md ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-green-500`}
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
            )}
          </div>
      

          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="start-date"
              {...register('startDate')}
              className={`mt-1 block w-full rounded-md ${errors.startDate ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-green-500`}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
            )}
          </div>
        </div>
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
                {...register('street')}
                className={`mt-1 block w-full rounded-md ${errors.street ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-green-500`}
              />
              {errors.street && (
                <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                {...register('city')}
                className={`mt-1 block w-full rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-green-500`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

          
              <Select
                id="state"
                label="State"
                options={stateOptions}
                value={selectedState}
                onChange={handleStateChange}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
              )}
            

            <div>
              <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="text"
                id="zip-code"
                {...register('zipCode')}
                className={`mt-1 block w-full rounded-md ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-green-500 focus:ring-green-500`}
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
              )}
            </div>
          </div>
        </fieldset>
          
          <Select
            id="department"
            label="Department"
            options={departments}
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          />
          {errors.department && (
            <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>
          )}
        

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
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
          <div className="pointer-events-auto">
            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title="Success!"
              message="Employee Created!"
            />
          </div>
        </div>
      )}
      
    </div>
  );
}
