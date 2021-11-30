import React from 'react';
import {
  Button, Dropdown, Form, Header, Transition,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Run } from '../domain/Run';

import 'react-datepicker/dist/react-datepicker.css';
import { DistanceMeasurements } from '../App';

interface SubmitCallback {
  (run : Run) : void;
}

interface RunFormProps {
  buttonTitle: string;
  onSubmitCallback: SubmitCallback;
}

type FormValues = {
  title: string,
  description: string,
  hour: number,
  minute: number,
  second: number,
  distance: number,
  date: Date,
  distanceMeasurement: DistanceMeasurements
}

const RunForm: React.FC<RunFormProps> = (props) => {
  const { t } = useTranslation();

  const defaultValues : FormValues = {
    description: '',
    title: '',
    hour: 1,
    minute: 1,
    second: 1,
    distance: 1,
    date: new Date(),
    distanceMeasurement: DistanceMeasurements.KILOMETRES,
  };

  const distanceMeasurementOptions = [
    {
      key: DistanceMeasurements.KILOMETRES,
      text: t('allRunList.kilometresMeasurement'),
      value: DistanceMeasurements.KILOMETRES,
    },
    {
      key: DistanceMeasurements.MILES,
      text: t('allRunList.milesMeasurement'),
      value: DistanceMeasurements.MILES,
    },
  ];

  const { buttonTitle, onSubmitCallback } = props;

  const {
    register, control, handleSubmit, formState,
  } = useForm<FormValues>({ mode: 'onChange', defaultValues });

  const addRunFromForm = (data : FormValues) => {
    const durationInSeconds = data.hour * 3600 + data.minute * 60 + data.second * 1;
    let distanceInMeters = data.distance;
    if (data.distanceMeasurement === DistanceMeasurements.KILOMETRES) {
      distanceInMeters *= 1000;
    } else {
      distanceInMeters *= 1609;
    }
    const run: Run = {
      id: data.title + data.date.getTime(),
      title: data.title,
      description: data.description,
      durationInSeconds,
      distanceInMeters,
      date: data.date,
    };
    onSubmitCallback(run);
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
                    required: true, min: 0.01,
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
                    required: true, min: 0.01,
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
                    required: true, min: 0.01,
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
                required: true, min: 0.01,
              })}
            />
            <Controller
              control={control}
              name="distanceMeasurement"
              rules={{ required: true }}
              defaultValue={DistanceMeasurements.KILOMETRES}
              render={({ field }) => (
                <Dropdown
                  selection
                  label={t('allRunList.measurementLabel')}
                  options={distanceMeasurementOptions}
                  value={field.value}
                  onChange={(event, data) => field.onChange(data.value as DistanceMeasurements)}
                />
              )}
            />
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
      <Button type="submit" color="violet" disabled={!formState.isValid}>{buttonTitle}</Button>
    </Form>
  );
};

export default RunForm;
