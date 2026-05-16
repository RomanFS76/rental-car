'use client';
import toast from 'react-hot-toast';

import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import 'react-datepicker/dist/react-datepicker.css';

import Button from '@/components/shared/Button/Button';
import { BookingPayload, createBooking } from '@/lib/api/api';
import css from './RentalForm.module.css';

const RentalForm = () => {

  const { id } = useParams<{ id: string }>();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: BookingPayload;
    }) => createBooking(id, payload),

    onSuccess: data => {
      toast.success('Booking request sent');
      ('Yes');
      (data);
    },

    onError: error => {
      toast.error('Something went wrong');
      (`Error: ${error}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: BookingPayload = {
      name: String(formData.get('name')),
      email: String(formData.get('email')),
      comment: String(formData.get('comment')),
    };

    mutate(
      { id, payload },
      {
        onSuccess: () => {
          form.reset();   
        },
      }
    );
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.header}>
        <h2 className={css.title}>Book your car now</h2>
        <p className={css.text}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={css.fields}>
        <input
          className={css.input}
          type="text"
          name="name"
          placeholder="Name*"
        />

        <input
          className={css.input}
          type="email"
          name="email"
          placeholder="Email*"
        />


        <textarea
          className={css.textarea}
          name="comment"
          placeholder="Comment"
        />
      </div>

      <Button type="submit" size="sm" className={css.btn} disabled={isPending}>
        {isPending ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
};

export default RentalForm;