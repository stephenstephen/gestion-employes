import * as yup from 'yup';

export const loginSchema = yup.object({
  username: yup
    .string()
    .required('Champ obligatoire'),
  password: yup
    .string()
    .min(6, '6 caractères minimum')
    .required('Champ obligatoire'),
});