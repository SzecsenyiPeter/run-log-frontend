import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RunForm from './RunForm';
import { addRun } from '../Api';
import { Run } from '../domain/Run';

const AddRunPage: React.FC = () => {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const sendRunToApi = async (run: Run) => {
    setIsSending(true);
    await addRun(run);
    setIsSending(false);
  };

  return (
    <RunForm buttonTitle={t('runForm.addButton')} onSubmitCallback={sendRunToApi} isSubmitButtonLoading={isSending} />
  );
};
export default AddRunPage;
