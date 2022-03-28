import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import RunForm from './RunForm';
import { editRun } from '../Api';
import { Run } from '../domain/Run';

interface EditRunState {
  id: string;
}

const EditRunPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const state = history.location.state as EditRunState;

  const editRunSubmitted = async (run: Run) => {
    setIsLoading(true);
    // eslint-disable-next-line no-param-reassign
    run.id = state.id;
    await editRun(run);
    setIsLoading(false);
    history.push('/list');
  };

  return (
    <RunForm buttonTitle={t('runForm.editButton')} onSubmitCallback={editRunSubmitted} isSubmitButtonLoading={isLoading} />
  );
};
export default EditRunPage;
