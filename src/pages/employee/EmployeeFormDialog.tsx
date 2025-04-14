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

interface EmployeeFormDialogProps {
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  trigger?: React.ReactNode;
  initialData?: Employee;
  title?: string;
  submitLabel?: string;
}

export function EmployeeFormDialog({
  trigger,
  initialData,
  onSubmit,
  title = 'Ajouter / Modifier un employé',
  submitLabel = 'Enregistrer',
}: EmployeeFormDialogProps) {

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleFormSubmit = (data: Omit<Employee, 'id'>) => {
    onSubmit(data);
    if (setDialogOpen) {
      setDialogOpen(false);
    }
  };
  return (
    <Dialog open={dialogOpen}  onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
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
