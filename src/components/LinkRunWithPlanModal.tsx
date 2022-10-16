import React, { useContext, useEffect } from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { getRunPlans, linkRunWithPlan } from '../Api';
import { NotificationTypes, RunLogContext, RunLogContextInterface } from '../App';
import { RunPlan } from '../domain/RunPlan';

interface LinkRunWithPlanProps {
    runId: number;
}

const LinkRunWithPlanModal: React.FC<LinkRunWithPlanProps> = (props) => {
  const { t } = useTranslation();

  const { runId } = props;

  const [open, setOpen] = React.useState(false);

  const [runPlans, setRunPlans] = React.useState<Array<RunPlan>>([]);
  const [runPlansLoading, setRunPlansLoading] = React.useState(true);

  const [selectedRunPlan, setSelectedRunPlan] = React.useState<string>('');
  const [linkingInProgress, setLinkingInProgress] = React.useState(false);

  const {
    runLogState,
  } = useContext<RunLogContextInterface>(RunLogContext);

  const onInputChanged = (value: string) => {
    const newSelection = runPlans.find((runPlan) => runPlan.instructions === value);
    if (newSelection !== undefined) {
      setSelectedRunPlan(newSelection.instructions);
    }
  };

  const onAddClicked = async () => {
    try {
      setLinkingInProgress(true);
      const currentSelection = runPlans.find((runPlan) => runPlan.instructions === selectedRunPlan);
      if (currentSelection !== undefined) {
        await linkRunWithPlan(runId, currentSelection.id);
        runLogState.triggerNotification(t('genericSuccess'), NotificationTypes.SUCCESS);
      }
    } catch (e) {
      runLogState.triggerNotification(t('genericFailure'), NotificationTypes.ERROR);
    }
    setOpen(false);
    setLinkingInProgress(false);
  };

  const isAddButtonDisabled = () => !runPlans
    .some((runPlan) => runPlan.instructions === selectedRunPlan);
  useEffect(() => {
    getRunPlans(null).then((result : Array<RunPlan>) => {
      setRunPlans(result);
      if (result && result.length > 0 && result[0].instructions) {
        setSelectedRunPlan(result[0].instructions);
      }
      setRunPlansLoading(false);
    });
  }, []);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dimmer="blurring"
      open={open}
      trigger={<Button data-testid="link-plan-open" color="violet">{t('runPage.link')}</Button>}
    >
      <Modal.Header>{t('runPage.link')}</Modal.Header>
      <Modal.Content content>

        <Input
          icon="calendar alternate outline"
          list="runPlans"
          loading={runPlansLoading}
          value={selectedRunPlan}
          onChange={(event) => onInputChanged(event.currentTarget.value)}
          iconPosition="left"
          placeholder={t('runPage.linkPlaceholder')}
        />
        <datalist id="runPlans">
          {runPlans.map((runPlan) => (
            <option value={runPlan.instructions}>
              {' '}
              {runPlan.instructions}
              {' '}
            </option>
          ))}
        </datalist>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          {t('setCoach.cancel')}
        </Button>
        <Button
          content={t('runPage.linkAdd')}
          data-testid="link-plan-confirm"
          labelPosition="right"
          icon="add"
          color="violet"
          disabled={isAddButtonDisabled()}
          loading={linkingInProgress}
          onClick={onAddClicked}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default LinkRunWithPlanModal;
