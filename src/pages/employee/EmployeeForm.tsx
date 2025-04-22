import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import { Employee } from '@/types/employee';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MaskedDateInput from '@/components/common/MaskedDateInput';
import { employeeSchema } from '@/types/validations/employee.schema';

type FormValues = InferType<typeof employeeSchema>;

interface Props {
  initialData?: Employee;
  onSubmit: (data: FormValues) => void;
  submitLabel?: string;
}

export const EmployeeForm: React.FC<Props> = ({ 
  initialData, 
  onSubmit, 
  submitLabel = 'Enregistrer' 
}) => {
  const defaultValues: Partial<FormValues> = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    entryDate: undefined,
    exitDate: undefined
  };

  const form = useForm<FormValues>({
    resolver: yupResolver(employeeSchema) as any,
    defaultValues,
    mode: 'onSubmit'
  });

  const { handleSubmit, reset, control, formState: { errors } } = form;

  // Ajoutons un état local pour la date
  const [localDateValue, setLocalDateValue] = useState('');

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      reset({
        ...defaultValues,
        ...rest,
        dateOfBirth: formatDate(rest.dateOfBirth),
        entryDate: rest.entryDate?.split('T')[0],
        exitDate: rest.exitDate?.split('T')[0]
      });
    } else {
      reset(defaultValues);
    }
  }, [initialData, reset]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Prénom" {...field} />
              </FormControl>
              {errors.firstName && (
                <FormMessage>{errors.firstName.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom" {...field} />
              </FormControl>
              {errors.lastName && (
                <FormMessage>{errors.lastName.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de naissance</FormLabel>
              <FormControl>
                <MaskedDateInput
                  {...field}
                  value={localDateValue || field.value || ''}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setLocalDateValue(newValue);
                    if (newValue.length === 10) {
                      field.onChange(newValue);
                    }
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (value.length === 10) {
                      field.onChange(value);
                      field.onBlur();
                    }
                  }}
                />
              </FormControl>
              <FormMessage>{errors.dateOfBirth?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="entryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date d'entrée</FormLabel>
              <FormControl>
                <Input 
                  type="date"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              {errors.entryDate && (
                <FormMessage>{errors.entryDate.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="exitDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de sortie</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              {errors.exitDate && (
                <FormMessage>{errors.exitDate.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <Button type="submit" variant={'blue'} className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};
