import React from 'react';
import { useTranslation } from 'react-i18next';
import RunForm from './RunForm';
import { addRun } from '../Api';

const AddRunPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <RunForm buttonTitle={t('runForm.addButton')} onSubmitCallback={addRun} />
  );
};
export default AddRunPage;
