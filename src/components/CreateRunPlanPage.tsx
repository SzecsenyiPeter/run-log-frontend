import {
  Button, Dropdown, Form, Header,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import React, { useContext, useEffect, useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import {
  DistanceMeasurements, NotificationTypes, RunLogContext, RunLogContextInterface,
} from '../App';
import { addRunPlan, getOwnRunners } from '../Api';
import { CreateRunPlan } from '../domain/CreateRunPlan';
import '../style/tagStyle.css';

const CreateRunPlanPage: React.FC = () => {
  const { t } = useTranslation();

  const {
    runLogState,
  } = useContext<RunLogContextInterface>(RunLogContext);

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

  const [athletes, setAthletes] = useState<Array<{id: string, text: string}>>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    setIsLoading(true);
    getOwnRunners().then((result) => {
      setAthletes(result
        .map((athlete) => ({ id: athlete, text: athlete })));
      setIsLoading(false);
    });
  }, []);

  const [formState, setFormState] = useState({
    instructions: '',
    distance: 0,
    distanceMeasurement: DistanceMeasurements.KILOMETRES,
    assignedTo: [{ id: '', text: '' }],
  });
  const handleAddition = (tag : {id: string, text: string}) => {
    setFormState({ ...formState, assignedTo: formState.assignedTo.concat(tag) });
    console.log(formState);
  };

  const handleDelete = (i: number) => {
    setFormState({
      ...formState,
      assignedTo: formState.assignedTo.filter((tag, index) => index !== i),
    });
  };
  const isFormInvalid = () => formState.distance <= 0 || !formState.instructions;
  const onCreateRunPlanClicked = async () => {
    const distanceInMeters = formState.distance
        * formState.distanceMeasurement === DistanceMeasurements.KILOMETRES ? 1000 : 1614;
    const createRunPlan: CreateRunPlan = {
      distance: distanceInMeters,
      instructions: formState.instructions,
      date: new Date(),
      assignedTo: formState.assignedTo.map((tag) => tag.text),
    };
    try {
      setIsLoading(true);
      await addRunPlan(createRunPlan);
      setIsLoading(false);
      runLogState.triggerNotification(t('genericSuccess'), NotificationTypes.SUCCESS);
    } catch (_) {
      runLogState.triggerNotification(t('genericFailure'), NotificationTypes.ERROR);
    }
  };
  return (
    <Form>
      <Header as="h0">
        { t('runPlanForm.header')}
        {' '}
      </Header>
      <Form.Field>
        <label htmlFor="instructions">
          { t('runPlanForm.instructions') }
        </label>
        <textarea
          id="instructions"
          placeholder={t('runPlanForm.instructionsPlaceholder')}
          value={formState.instructions}
          onChange={(
            event,
          ) => setFormState({ ...formState, instructions: event.currentTarget.value })}
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="distance">
          { t('runPlanForm.distance') }
        </label>
        <div className="ui right labeled input">
          <input
            id="distance"
            type="number"
            value={formState.distance}
            onChange={(
              event,
            ) => setFormState({ ...formState, distance: parseFloat(event.currentTarget.value) })}
            placeholder="Distance"
          />
          <Dropdown
            selection
            label={t('allRunList.measurementLabel')}
            options={distanceMeasurementOptions}
            value={formState.distanceMeasurement}
            onChange={(
              event, data,
            ) => setFormState({
              ...formState,
              distanceMeasurement: data.value as DistanceMeasurements,
            })}
          />
        </div>
      </Form.Field>
      <Form.Field>
        <label htmlFor="assignedTo">
          { t('runPlanForm.assignedTo') }
        </label>
        <ReactTags
          handleAddition={handleAddition}
          handleDelete={handleDelete}
          tags={formState.assignedTo}
          placeholder=""
          suggestions={athletes}
          allowUnique
          inputFieldPosition="top"
          autocomplete
          minQueryLength={0}
        />
      </Form.Field>
      <Button type="submit" color="violet" onClick={onCreateRunPlanClicked} loading={isLoading} disabled={isFormInvalid()} content={t('runPlanForm.submit')} />
    </Form>
  );
};
export default CreateRunPlanPage;
