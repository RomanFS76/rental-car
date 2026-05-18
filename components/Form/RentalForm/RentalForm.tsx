'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';

import Button from '@/components/shared/Button/Button';
import { BookingPayload, createBooking } from '@/lib/api/api';
import css from './RentalForm.module.css';

interface RentalFormValues {
  name: string;
  email: string;
  comment: string;
}

const STORAGE_KEY = 'rental-form-values';

const initialValues: RentalFormValues = {
  name: '',
  email: '',
  comment: '',
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Please fill name field')
    .min(3, 'Name must be at least 3 characters')
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only latin letters'),

  email: Yup.string()
    .trim()
    .required('Please fill email field')
    .email('Please enter a valid email'),

  comment: Yup.string()
    .trim()
    .required('Please fill comment field')
    .matches(
      /^[A-Za-z0-9\s.,!?'"-]*$/,
      'Comment must contain only latin letters'
    ),
});

const getSavedValues = (): RentalFormValues => {
  if (typeof window === 'undefined') {
    return initialValues;
  }

  const savedValues = localStorage.getItem(STORAGE_KEY);

  return savedValues ? JSON.parse(savedValues) : initialValues;
};

const FormikAutoSave = ({ values }: { values: RentalFormValues }) => {
  useEffect(() => {
    const hasValues = values.name || values.email || values.comment;

    if (hasValues) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    }
  }, [values]);

  return null;
};

const RentalForm = () => {
  const { id } = useParams<{ id: string }>();
  const [savedInitialValues] = useState(getSavedValues);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: BookingPayload }) =>
      createBooking(id, payload),
  });

  const handleSubmit = (
    values: RentalFormValues,
    actions: FormikHelpers<RentalFormValues>
  ) => {
    const payload: BookingPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      comment: values.comment.trim(),
    };

    mutate(
      { id, payload },
      {
        onSuccess: (data) => {
          localStorage.removeItem(STORAGE_KEY);

          actions.resetForm({
            values: initialValues,
          });

          toast.success(`${data?.message}`);
        },

        onError: () => {
          toast.error('Something went wrong');
        },

        onSettled: () => {
          actions.setSubmitting(false);
        },
      }
    );
  };

  return (
    <Formik
      initialValues={savedInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => (
        <Form className={css.form}>
          <FormikAutoSave values={values} />

          <div className={css.header}>
            <h2 className={css.title}>Book your car now</h2>

            <p className={css.text}>
              Stay connected! We are always ready to help you.
            </p>
          </div>

          <div className={css.fields}>
            <div className={css.field}>
              <ErrorMessage
                name="name"
                component="p"
                className={css.error}
              />

              <Field
                className={clsx(
                  css.input,
                  errors.name && css.inputError
                )}
                type="text"
                name="name"
                placeholder="Name*"
              />
            </div>

            <div className={css.field}>
              <ErrorMessage
                name="email"
                component="p"
                className={css.error}
              />

              <Field
                className={clsx(
                  css.input,
                  errors.email && touched.email && css.inputError
                )}
                type="text"
                name="email"
                placeholder="Email*"
              />
            </div>

            <div className={css.field}>
              <ErrorMessage
                name="comment"
                component="p"
                className={css.error}
              />

              <Field
                as="textarea"
                className={clsx(
                  css.textarea,
                  errors.comment &&
                    touched.comment &&
                    css.inputError
                )}
                name="comment"
                placeholder="Comment"
                maxLength={300}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="sm"
            className={css.btn}
            disabled={isPending}
          >
            {isPending ? 'Sending...' : 'Send'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RentalForm;