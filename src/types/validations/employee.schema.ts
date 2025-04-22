import * as yup from 'yup';
import moment from 'moment';

export const employeeSchema = yup.object({
  firstName: yup.string().required("Prénom requis"),
  lastName: yup.string().required("Nom requis"),
  dateOfBirth: yup
    .string()
    .required('Date de naissance requise')
    .test('valid-date', 'Date invalide', (value) => {
      if (!value || value.length < 10) return true;
      return moment(value, 'DD/MM/YYYY', true).isValid() &&
             moment(value, 'DD/MM/YYYY').isSameOrBefore(moment()) &&
             moment().diff(moment(value, 'DD/MM/YYYY'), 'years') >= 18;
    }),
  entryDate: yup.string().required("Date d'entrée requise"),
  exitDate: yup.string().nullable().notRequired(),
});
