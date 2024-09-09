import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const signupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    surname: Yup.string()
      .min(2, 'Surname must be at least 2 characters')
      .required('Surname is required'),
    phoneNumber: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email address'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    namibianId: Yup.string()
      .matches(/^[0-9]{11}$/, 'Invalid Namibian ID (must be 11 digits)'),
  });
  
  export const profileUpdateSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    surname: Yup.string()
      .min(2, 'Surname must be at least 2 characters')
      .required('Surname is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
      .required('Phone number is required'),
    namibianId: Yup.string()
      .matches(/^[0-9]{11}$/, 'Invalid Namibian ID (must be 11 digits)')
      .nullable(),
  });