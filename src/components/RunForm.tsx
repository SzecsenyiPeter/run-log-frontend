import React from "react";
import {Button, Dropdown, Form, Input } from 'semantic-ui-react';
const distanceMeasurementOptions = [
        { key: 'KM', text: 'Kilometres', value: 'KM' },
        { key: 'M', text: 'Miles', value: 'M' },
    ]
;
export const RunForm: React.FC = () => {
    return (
        <Form>
            <h1>Add new run</h1>
            <Form.Field>
                <label>Duration</label>
                <Input placeholder="Duration"></Input>
            </Form.Field>
            <Form.Field>
                <label>Distance</label>
                <Input label={<Dropdown defaultValue='KM' options={distanceMeasurementOptions} /> } labelPosition='right' placeholder="Distance"></Input>
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    );
}