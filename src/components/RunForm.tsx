import React from 'react';
import {
  Button, Dropdown, Form, Input,
} from 'semantic-ui-react';

const distanceMeasurementOptions = [
  { key: 'KM', text: 'Kilometres', value: 'KM' },
  { key: 'M', text: 'Miles', value: 'M' },
];
const RunForm: React.FC = () => (
  <Form>
    <h1>Add new run</h1>
    <Form.Field>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>Duration</label>
      <Input placeholder="Duration" />
    </Form.Field>
    <Form.Field>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>Distance</label>
      <Input label={<Dropdown defaultValue="KM" options={distanceMeasurementOptions} />} labelPosition="right" placeholder="Distance" />
    </Form.Field>
    <Button type="submit">Submit</Button>
  </Form>
);
export default RunForm;
