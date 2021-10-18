import React from 'react';
import {
  Button, Form, Header,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

type FormValues = {
  title: string,
  description: string,
  hour: number,
  minute: number,
  second: number,
  distance: number,
  distanceMeasurement: string
}

const RunForm: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm<FormValues>({ mode: 'onChange' });

  return (
    <Form onSubmit={handleSubmit((data) => { console.log(data); })}>
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
          <Form.Group>
            <Form.Field>
              <div className="ui right labeled input">
                <input
                  id="duration"
                  type="number"
                  {...register('hour', {
                    required: true, min: 0, value: 0,
                  })}
                />
                <div className="ui basic label">
                  { t('runForm.hourLabel') }
                </div>
              </div>

              <div className="ui pointing red basic label" style={{ visibility: formState.errors.hour ? 'visible' : 'hidden' }}>
                { t('runForm.formError') }
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui right labeled input">
                <input
                  id="duration"
                  type="number"
                  {...register('minute', {
                    required: true, min: 0, value: 0,
                  })}
                />
                <div className="ui basic label">
                  { t('runForm.minuteLabel') }
                </div>
              </div>
              { formState.errors.minute && (
              <div className="ui pointing red basic label">
                { t('runForm.formError') }
              </div>
              )}
            </Form.Field>
            <Form.Field>
              <div className="ui right labeled input">
                <input
                  id="duration"
                  type="number"
                  {...register('second', {
                    required: true, min: 0, value: 0,
                  })}
                />
                <div className="ui basic label">
                  { t('runForm.hourLabel') }
                </div>
              </div>
              { formState.errors.second && (
              <div className="ui pointing red basic label">
                {' '}
                { t('runForm.formError') }
                {' '}
              </div>
              )}
            </Form.Field>
          </Form.Group>
        </Form.Field>
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
                required: true, min: 0, value: 0,
              })}
            />
            <select className="ui compact selection dropdown" {...register('distanceMeasurement')}>
              <option value="km">{ t('runForm.kilometres') }</option>
              <option selected value="m">{ t('runForm.miles') }</option>
            </select>
          </div>
          { formState.errors.distance && (
          <div className="ui pointing red basic label">
            {' '}
            { t('runForm.formError') }
            {' '}
          </div>
          )}
        </Form.Field>
      </Form.Group>
      <Button type="submit" primary disabled={!formState.isValid}>{ t('runForm.addButton')}</Button>
    </Form>
  );
};
export default RunForm;
