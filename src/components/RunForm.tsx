import React from 'react';
import {
  Button, Dropdown, Form, Header, Input,
} from 'semantic-ui-react';

const distanceMeasurementOptions = [
  { key: 'KM', text: 'Kilometres', value: 'KM' },
  { key: 'M', text: 'Miles', value: 'M' },
];
const RunForm: React.FC = () => (
  <Form>
    <Header as="h1">Add new run</Header>
    <Form.Field>
      <label htmlFor="title">
        Title
      </label>
      <Input id="title" placeholder="Title of the run" />
    </Form.Field>
    <Form.Field>
      <label htmlFor="description">
        Description
      </label>
      <Form.TextArea id="description" placeholder="Write something about the run" />
    </Form.Field>
    <Form.Group widths="equal">
      <Form.Field>
        <label htmlFor="duration">
          Duration
        </label>
        <Input id="duration" placeholder="Duration" />
      </Form.Field>
      <Form.Field>
        <label htmlFor="distance">
          Distance
        </label>
        <Input id="distance" label={<Dropdown defaultValue="KM" options={distanceMeasurementOptions} />} labelPosition="right" placeholder="Distance" />
      </Form.Field>
    </Form.Group>

    <Button type="submit">Submit</Button>
  </Form>
);
export default RunForm;
