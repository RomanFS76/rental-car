'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import Button from '@/components/shared/Button/Button';
import { BookingPayload, createBooking } from '@/lib/api/api';
import css from './RentalForm.module.css';

const RentalForm = () => {
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
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
      console.log('Yes');
      console.log(data);
    },

    onError: error => {
      console.log(`Error: ${error}`);
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
      date: bookingDate ? format(bookingDate, 'dd.MM.yyyy') : '',
    };

    mutate(
      { id, payload },
      {
        onSuccess: () => {
          form.reset();
          setBookingDate(null);
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

        <DatePicker
          selected={bookingDate}
          onChange={(date: Date | null) => setBookingDate(date)}
          placeholderText="Booking date"
          dateFormat="dd.MM.yyyy"
          minDate={new Date()}
          className={css.input}
          calendarClassName={css.calendar}
          showPopperArrow
          calendarStartDay={1}
          formatWeekDay={name => name.slice(0, 3).toUpperCase()}
          previousMonthButtonLabel=""
          nextMonthButtonLabel=""
          autoComplete="off"
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