import React, { useContext, useEffect } from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { getUnaffiliatedRunners, setAthletesCoach } from '../Api';
import { NotificationTypes, RunLogContext, RunLogContextInterface } from '../App';

function AddCoachedAthleteModal() {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const [athletes, setAthletes] = React.useState<Array<string>>([]);
  const [athletesLoading, setAthletesLoading] = React.useState(true);

  const [selectedAthlete, setSelectedAthlete] = React.useState<string>('');
  const [athleteCoachLoading, setAthleteCoachLoading] = React.useState(false);

  const {
    runLogState,
  } = useContext<RunLogContextInterface>(RunLogContext);

  const onCloseClicked = async () => {
    try {
      setAthleteCoachLoading(true);
      await setAthletesCoach(selectedAthlete);
      runLogState.triggerNotification(t('genericSuccess'), NotificationTypes.SUCCESS);
    } catch (e) {
      runLogState.triggerNotification(t('genericFailure'), NotificationTypes.ERROR);
    }
    setOpen(false);
    setAthleteCoachLoading(false);
  };

  const isAddButtonDisabled = () => !athletes.some((athlete) => athlete === selectedAthlete);

  useEffect(() => {
    getUnaffiliatedRunners().then((result) => {
      setAthletes(result);
      setAthletesLoading(false);
    });
  }, []);
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      dimmer="blurring"
      open={open}
      trigger={<Button color="violet">{t('setCoach.open')}</Button>}
    >
      <Modal.Header>{t('setCoach.title')}</Modal.Header>
      <Modal.Content content>

        <Input
          icon="users"
          list="athletes"
          loading={athletesLoading}
          value={selectedAthlete}
          onChange={(event) => setSelectedAthlete(event.currentTarget.value)}
          iconPosition="left"
          placeholder={t('setCoach.placeholder')}
        />
        <datalist id="athletes">
          {athletes.map((athlete) => (
            <option value={athlete}>{athlete}</option>
          ))}
        </datalist>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          {t('setCoach.cancel')}
        </Button>
        <Button
          content={t('setCoach.add')}
          labelPosition="right"
          icon="add"
          color="violet"
          loading={athleteCoachLoading}
          onClick={onCloseClicked}
          disabled={isAddButtonDisabled()}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default AddCoachedAthleteModal;
