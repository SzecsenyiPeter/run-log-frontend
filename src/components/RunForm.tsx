import React, { useState } from 'react';
import {
  Button, Dropdown, Form, Header, Input,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

const RunForm: React.FC = () => {
  const { t } = useTranslation();

  const distanceMeasurementOptions = [
    { key: 'KM', text: t('runForm.kilometres'), value: 'KM' },
    { key: 'M', text: t('runForm.miles'), value: 'M' },
  ];

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [distance, setDistance] = useState(0);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(parseInt(e.target.value, 10));
  };
  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(parseInt(e.target.value, 10));
  };
  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecond(parseInt(e.target.value, 10));
  };
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(parseInt(e.target.value, 10));
  };
  const onSubmit = () => {
    console.log(title);
    console.log(distance);
  };
  return (
    <Form>
      <Header as="h0">{ t('runForm.header') }</Header>
      <Form.Field>
        <label htmlFor="title">
          { t('runForm.titleLabel') }
        </label>
        <Input id="title" placeholder={t('runForm.titleDescription')} value={title} onChange={handleTitleChange} />
      </Form.Field>
      <Form.Field>
        <label htmlFor="description">
          { t('runForm.descriptionLabel') }
        </label>
        <Form.TextArea id="description" placeholder={t('runForm.descriptionDescription')} value={description} onChange={handleDescriptionChange} />
      </Form.Field>
      <Form.Group widths="equal">
        <Form.Field>
          <label htmlFor="duration">
            { t('runForm.durationLabel') }
          </label>
          <Form.Group>
            <Form.Field>
              <Input id="duration" label={{ basic: true, content: t('runForm.hourLabel') }} labelPosition="right" value={hour} onChange={handleHourChange} />
            </Form.Field>
            <Form.Field>
              <Input label={{ basic: true, content: t('runForm.minuteLabel') }} labelPosition="right" value={minute} onChange={handleMinuteChange} />
            </Form.Field>
            <Form.Field>
              <Input label={{ basic: true, content: t('runForm.secondLabel') }} labelPosition="right" value={second} onChange={handleSecondChange} />
            </Form.Field>
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <label htmlFor="distance">
            { t('runForm.distanceLabel') }
          </label>
          <Input
            id="distance"
            label={<Dropdown defaultValue="KM" options={distanceMeasurementOptions} />}
            labelPosition="right"
            placeholder="Distance"
            value={distance}
            onChange={handleDistanceChange}
          />
        </Form.Field>
      </Form.Group>
      <Button type="submit" primary onClick={onSubmit}>{ t('runForm.addButton') }</Button>
    </Form>
  );
};
export default RunForm;
