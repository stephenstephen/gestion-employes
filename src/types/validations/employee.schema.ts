import * as yup from 'yup';
import moment from 'moment';

export const employeeSchema = yup.object({
  firstName: yup.string().required("Prénom requis"),
  lastName: yup.string().required("Nom requis"),
  dateOfBirth: yup
    .string()
    .required('Date de naissance requise')
    .test('valid-date', 'Format de date invalide', (value) =>
      moment(value, 'DD/MM/YYYY', true).isValid()
    )
    .test('not-in-future', 'La date ne peut pas être dans le futur', (value) =>
      moment(value, 'DD/MM/YYYY').isSameOrBefore(moment())
    )
    .test('minimum-age', 'L\'âge doit être d\'au moins 18 ans', (value) =>
      moment().diff(moment(value, 'DD/MM/YYYY'), 'years') >= 18
    ),
  entryDate: yup.string().required("Date d'entrée requise"),
  exitDate: yup.string().nullable().notRequired(),
});
