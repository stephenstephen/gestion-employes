import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog';
  import { ReactNode } from 'react';
  
  interface ConfirmDialogProps {
    trigger: ReactNode;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    confirmVariant?: string;
  }
  
  export const ConfirmDialog = ({
    trigger,
    title = 'Êtes-vous sûr ?',
    description = 'Cette action est irréversible.',
    confirmLabel = 'Confirmer',
    cancelLabel = 'Annuler',
    onConfirm,
    confirmVariant = 'bg-red-600 hover:bg-red-700',
  }: ConfirmDialogProps) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm} className={confirmVariant}>
              {confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  