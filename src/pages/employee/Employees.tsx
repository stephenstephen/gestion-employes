import EmployeeTable from '@/components/employees/EmployeeTable';

const Employees = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Liste des employés</h1>
      <EmployeeTable />
    </div>
  );
};

export default Employees;
