'use client';

import Button from '@/components/shared/Button/Button';
import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import { useState } from 'react';
import css from './RentalForm.module.css';

const RenatalForm = () => {
  const [bookingDate, setBookingDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formattedDate = bookingDate ? format(bookingDate, 'dd.MM.yyyy') : '';

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      comment: formData.get('comment'),
      date: formattedDate,
    };
    console.log(data);
    form.reset();
    setBookingDate(null);
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

      <Button type="submit" size="sm" className={css.btn}>
        Send
      </Button>
    </form>
  );
};

export default RenatalForm;
