import React from 'react';
import {
  Button, Form, Header, Input,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

type FormValues = {
  title: string,
  description: string,
  hour: number,
  minute: number,
  second: number,
  distance: number
}

const RunForm: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<FormValues>();

  const distanceMeasurementOptions = [
    { key: 'KM', text: t('runForm.kilometres'), value: 'KM' },
    { key: 'M', text: t('runForm.miles'), value: 'M' },
  ];

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
              <Input label={{ basic: true, content: t('runForm.minuteLabel') }} labelPosition="right">
                <input
                  id="duration"
                  {...register('hour', {
                    required: true, min: 0, max: 60, value: 0,
                  })}
                />
              </Input>
            </Form.Field>
            <Form.Field>
              <Input label={{ basic: true, content: t('runForm.minuteLabel') }} labelPosition="right" {...register('minute')} />
            </Form.Field>
            <Form.Field>
              <Input label={{ basic: true, content: t('runForm.secondLabel') }} labelPosition="right" {...register('second')} />
            </Form.Field>
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <label htmlFor="distance">
            { t('runForm.distanceLabel') }
          </label>
          <Input labelPosition="right">
            <input
              id="distance"
              placeholder="Distance"
              {...register('distance')}
            />
            <Form.Dropdown defaultValue="KM" options={distanceMeasurementOptions} />
          </Input>
        </Form.Field>
      </Form.Group>
      <Button type="submit" primary>{ t('runForm.addButton') }</Button>
    </Form>
  );
};
export default RunForm;
