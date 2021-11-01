import React from 'react';
import {
  Button, Form, Header, Transition,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { addRun } from '../Api';
import { Run } from '../domain/Run';

import 'react-datepicker/dist/react-datepicker.css';

type FormValues = {
  title: string,
  description: string,
  hour: number,
  minute: number,
  second: number,
  distance: number,
  date: Date,
  distanceMeasurement: string
}

const RunForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    register, control, handleSubmit, formState,
  } = useForm<FormValues>({ mode: 'onChange' });
  const addRunFromForm = (data : FormValues) => {
    const durationInSeconds = data.hour * 3600 + data.minute * 60 + data.second * 1;
    console.log(data);
    let distanceInMeters = data.distance;
    if (data.distanceMeasurement === 'km') {
      distanceInMeters *= 1000;
    } else {
      distanceInMeters *= 1609;
    }
    const run: Run = {
      title: data.title,
      description: data.description,
      durationInSeconds,
      distanceInMeters,
      date: data.date,
    };
    addRun(run);
  };

  return (
    <Form onSubmit={handleSubmit(addRunFromForm)}>
      <Header as="h0">{ t('runForm.header') }</Header>
      <Form.Field>
        <label htmlFor="title">
          { t('runForm.titleLabel') }
        </label>
        <input id="title" placeholder={t('runForm.titleDescription')} {...register('title')} />
      </Form.Field>
      <Form.Field>
        <label htmlFor="description">
          { t('runForm.descriptionLabel') }
        </label>
        <textarea id="description" placeholder={t('runForm.descriptionDescription')} {...register('description')} />
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field>
          <label htmlFor="duration">
            { t('runForm.durationLabel') }
          </label>
          <Form.Group widths="equal">
            <Form.Field>
              <div className="ui right labeled input">
                <input
                  id="duration"
                  type="number"
                  {...register('hour', {
                    required: true, min: 0,
                  })}
                />
                <div className="ui basic label">
                  { t('runForm.hourLabel') }
                </div>
              </div>
              <Transition visible={!!formState.errors.hour} animation="slide down" duration={500}>
                <div className="ui pointing red basic label">
                  {' '}
                  { t('runForm.formError') }
                  {' '}
                </div>
              </Transition>
            </Form.Field>
            <Form.Field>
              <div className="ui right labeled input">
                <input
                  id="duration"
                  type="number"
                  {...register('minute', {
                    required: true, min: 0,
                  })}
                />
                <div className="ui basic label">
                  { t('runForm.minuteLabel') }
                </div>
              </div>
              <Transition visible={!!formState.errors.minute} animation="scale" duration={500}>
                <div className="ui pointing red basic label">
                  {' '}
                  { t('runForm.formError') }
                  {' '}
                </div>
              </Transition>
            </Form.Field>
            <Form.Field>
              <div className="ui right labeled input">
                <input
                  id="duration"
                  type="number"
                  {...register('second', {
                    required: true, min: 0,
                  })}
                />
                <div className="ui basic label">
                  { t('runForm.hourLabel') }
                </div>
              </div>
              <Transition visible={!!formState.errors.second} animation="scale" duration={500}>
                <div className="ui pointing red basic label">
                  {' '}
                  { t('runForm.formError') }
                  {' '}
                </div>
              </Transition>
            </Form.Field>
          </Form.Group>
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Field>
          <label htmlFor="distance">
            { t('runForm.distanceLabel') }
          </label>
          <div className="ui right labeled input">
            <input
              id="distance"
              type="number"
              placeholder="Distance"
              {...register('distance', {
                required: true, min: 0,
              })}
            />
            <select className="ui compact selection dropdown" {...register('distanceMeasurement')}>
              <option value="km">{ t('runForm.kilometres') }</option>
              <option selected value="m">{ t('runForm.miles') }</option>
            </select>
          </div>
          { formState.errors.distance && (
          <Transition visible={!!formState.errors.distance} animation="scale" duration={500}>
            <div className="ui pointing red basic label">
              {' '}
              { t('runForm.formError') }
              {' '}
            </div>
          </Transition>
          )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="date">
            { t('runForm.dateLabel') }
          </label>
          <Controller
            control={control}
            name="date"
            rules={{ required: true }}
            defaultValue={new Date()}
            render={({ field }) => (
              <DatePicker
                onChange={(date: Date) => field.onChange(date)}
                selected={field.value}
                strictParsing
                maxDate={new Date()}
              />
            )}
          />
          <Transition visible={!!formState.errors.date} animation="scale" duration={500}>
            <div className="ui pointing red basic label">
              {' '}
              { t('runForm.dateError') }
              {' '}
            </div>
          </Transition>
        </Form.Field>
      </Form.Group>
      <Button type="submit" primary disabled={!formState.isValid}>{ t('runForm.addButton')}</Button>
    </Form>
  );
};
export default RunForm;
