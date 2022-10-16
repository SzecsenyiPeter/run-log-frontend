import React, { useEffect } from 'react';
import {
  Button, Dropdown, Form, Grid, Header, Transition,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useFilePicker } from 'use-file-picker';
import { Run } from '../domain/Run';

import 'react-datepicker/dist/react-datepicker.css';
import { DistanceMeasurements } from '../App';
import { convertTcx } from '../utils/ConvertTcx';

interface SubmitCallback {
  (run : Run) : void;
}

interface RunFormProps {
  buttonTitle: string;
  onSubmitCallback: SubmitCallback;
  isSubmitButtonLoading: boolean;
}

type FormValues = {
  title: string,
  description: string,
  hour: number,
  minute: number,
  second: number,
  distance: number,
  heartRate: number,
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
    heartRate: 150,
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

  const { buttonTitle, onSubmitCallback, isSubmitButtonLoading } = props;

  const {
    register, control, handleSubmit, formState, getValues, trigger, setValue,
  } = useForm<FormValues>({ mode: 'onChange', defaultValues });

  const addRunFromForm = (data : FormValues) => {
    const durationInSeconds = (parseInt(String(data.hour), 10) * 3600)
        + (parseInt(String(data.minute), 10) * 60)
        + parseInt(String(data.second), 10);
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
      heartRate: data.heartRate,
    };
    onSubmitCallback(run);
  };
  const [openFileSelector, { filesContent }] = useFilePicker({
    accept: '.tcx',
  });
  useEffect(() => {
    if (filesContent.length > 0) {
      const result = convertTcx(filesContent[0].content);
      setValue('heartRate', Math.round(result.heartRate));
      setValue(
        'distance',
        +(getValues('distanceMeasurement') === DistanceMeasurements.MILES ? result.distance / 1609 : result.distance / 1000).toFixed(2),
      );
      setValue('hour', Math.floor(result.duration / 3600));
      setValue('minute', Math.floor((result.duration % 3600) / 60));
      setValue('second', Math.floor(result.duration % 3600 % 60));
    }
  }, [filesContent]);
  const validateDuration = () => Number(getValues('hour')) + Number(getValues('minute')) + Number(getValues('second')) > 0;

  return (
    <Form onSubmit={handleSubmit(addRunFromForm)}>
      <Header as="h0">{ t('runForm.header') }</Header>
      <Form.Field>
        <label htmlFor="title">
          { t('runForm.titleLabel') }
        </label>
        <input id="title" data-testid="run-form-title" placeholder={t('runForm.titleDescription')} {...register('title')} />
      </Form.Field>
      <Form.Field>
        <label htmlFor="description">
          { t('runForm.descriptionLabel') }
        </label>
        <textarea id="description" data-testid="run-form-description" placeholder={t('runForm.descriptionDescription')} {...register('description')} />
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
                  data-testid="run-form-hour"
                  {...register('hour', {
                    required: true, min: 0.0, validate: validateDuration, onChange: () => trigger(),
                  })}
                />
                <div className="ui basic label">
                  { t('runForm.hourLabel') }
                </div>
              </div>
              <Transition visible={!!formState.errors.hour || !!formState.errors.minute || !!formState.errors.second} animation="slide down" duration={500}>
                <div className="ui red basic label" style={{ marginTop: '10px' }}>
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
                  data-testid="run-form-minute"
                  type="number"
                  {...register('minute', {
                    required: true, min: 0.0, validate: validateDuration, onChange: () => trigger(),
                  })}
                />
                <div className="ui basic label">
                  { t('runForm.minuteLabel') }
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui right labeled input">
                <input
                  id="duration"
                  data-testid="run-form-second"
                  type="number"
                  {...register('second', {
                    required: true, min: 0.0, validate: validateDuration, onChange: () => trigger(),
                  })}
                />
                <div className="ui basic label">
                  { t('runForm.secondLabel') }
                </div>
              </div>
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
              data-testid="run-form-distance"
              type="number"
              step="0.01"
              placeholder="Distance"
              {...register('distance', {
                required: true, min: 0.0,
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
          <label htmlFor="heartRate">
            { t('runForm.heartRateLabel') }
          </label>
          <div className="ui right labeled input">
            <input
              id="heartRate"
              data-testid="run-form-heartrate"
              type="number"
              {...register('heartRate', {
                required: true, min: 0.0,
              })}
            />
            <div className="ui basic label">
              { t('runForm.heartRateUnit') }
            </div>
          </div>
          { formState.errors.heartRate && (
          <Transition visible={!!formState.errors.heartRate} animation="scale" duration={500}>
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
      <Grid>
        <Grid.Column floated="left" width={5}>
          <Button type="button" color="green" onClick={() => (openFileSelector())}>{t('runForm.uploadFile')}</Button>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          <Button type="submit" data-testid="run-form-submit" color="violet" disabled={!formState.isValid || isSubmitButtonLoading} loading={isSubmitButtonLoading}>{buttonTitle}</Button>
        </Grid.Column>
      </Grid>

    </Form>
  );
};

export default RunForm;
