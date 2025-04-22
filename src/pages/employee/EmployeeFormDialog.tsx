import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Employee } from '@/types/employee';
import { EmployeeForm } from '@/pages/employee/EmployeeForm';
import { DialogDescription } from '@radix-ui/react-dialog';
import { employeeSchema } from '@/types/validations/employee.schema';
import type { InferType } from 'yup';

interface EmployeeFormDialogProps {
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  trigger?: React.ReactNode;
  initialData?: Employee;
  title?: string;
  submitLabel?: string;
}

type FormValues = InferType<typeof employeeSchema>;

export function EmployeeFormDialog({
  trigger,
  initialData,
  onSubmit,
  title = 'Ajouter / Modifier un employé',
  submitLabel = 'Enregistrer',
}: EmployeeFormDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFormSubmit = (data: FormValues) => {
    console.log('Données reçues dans le dialog:', data);
    
    // Ne formatons la date que si elle existe et est au bon format
    if (data.dateOfBirth && data.dateOfBirth.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const formattedDate = formatDate(data.dateOfBirth);
      console.log('Date formatée:', formattedDate);
      
      onSubmit({
        ...data,
        dateOfBirth: formattedDate
      });
      setDialogOpen(false);
    } else {
      console.log('Format de date invalide dans le dialog');
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire ci-dessous pour ajouter ou modifier un employé.
          </DialogDescription>
        </DialogHeader>

        <EmployeeForm
          initialData={initialData}
          onSubmit={handleFormSubmit}
          submitLabel={submitLabel}
        />
      </DialogContent>
    </Dialog>
  );
}

// Utility function
const formatDate = (date: string): string => {
  if (!date) return '';
  const [day, month, year] = date.split('/');
  if (!day || !month || !year) return '';
  return `${year}-${month}-${day}`;
};
