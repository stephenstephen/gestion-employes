import * as yup from 'yup';

export const registerSchema = yup.object({
  username: yup.string().required("Nom d'utilisateur requis"),
  password: yup
    .string()
    .required('Mot de passe requis')
    .min(8, 'Au moins 8 caractères')
    .matches(/[A-Z]/, 'Au moins une majuscule')
    .matches(/[a-z]/, 'Au moins une minuscule')
    .matches(/[0-9]/, 'Au moins un chiffre')
    .matches(/[^a-zA-Z0-9]/, 'Au moins un caractère spécial'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
    .required('Confirmation requise'),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;
