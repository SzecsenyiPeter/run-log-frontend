import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RunForm from './RunForm';
import { addRun } from '../Api';
import { Run } from '../domain/Run';
import { NotificationTypes, RunLogContext, RunLogContextInterface } from '../App';

const AddRunPage: React.FC = () => {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const {
    runLogState,
  } = useContext<RunLogContextInterface>(RunLogContext);
  const sendRunToApi = async (run: Run) => {
    setIsSending(true);
    await addRun(run);
    setIsSending(false);
    runLogState.triggerNotification(t('runForm.success'), NotificationTypes.SUCCESS);
  };

  return (
    <RunForm buttonTitle={t('runForm.addButton')} onSubmitCallback={sendRunToApi} isSubmitButtonLoading={isSending} />
  );
};
export default AddRunPage;
