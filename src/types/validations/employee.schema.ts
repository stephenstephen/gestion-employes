import * as yup from 'yup';

export const employeeSchema = yup.object({
  firstName: yup.string().required("Prénom requis"),
  lastName: yup.string().required("Nom requis"),
  dateOfBirth: yup.string().required("Date de naissance requise"),
  entryDate: yup.string().required("Date d'entrée requise"),
  exitDate: yup.string().nullable().notRequired(),
});
