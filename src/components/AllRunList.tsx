import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import {
  Container, Form, Loader, Segment,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { deleteRun, getRunPlans, getRuns } from '../Api';
import { RunGroup } from '../domain/RunGroup';
import RunGroupTable, { GroupingIntervals } from './RunGroupTable';
import { Run } from '../domain/Run';
import { DistanceMeasurements, RunLogContext, RunLogContextInterface } from '../App';
import AddCoachedAthleteModal from './AddCoachedAthleteModal';
import { UserTypes } from '../domain/RegisterUser';
import { RunPlan } from '../domain/RunPlan';

export interface AllRunListProps {
  userToShow: string | null;
}

const AllRunList: React.FC<AllRunListProps> = (props) => {
  const { t } = useTranslation();
  const { userToShow } = props;
  const [groupables, setGroupables] = useState<Array<Run | RunPlan>>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  function loadGroupables() {
    getRuns(userToShow).then((runResult) => {
      const runs: Array<Run> = runResult;
      getRunPlans(userToShow).then((runPlanResult) => {
        const runPlans: Array<RunPlan> = runPlanResult;
        setGroupables(groupables
          .concat(runs, runPlans)
          .sort((first, second) => first.date.getTime() - second.date.getTime()));
        setIsLoading(false);
      });
    });
  }

  useEffect(() => {
    setIsLoading(true);
    loadGroupables();
  }, []);
  const deleteRunCallback = async (id: string) => {
    setIsLoading(true);
    await deleteRun(id);
    loadGroupables();
    setIsLoading(false);
  };
  const groupingIntervalOptions = [
    {
      key: GroupingIntervals.WEEK,
      text: t('allRunList.weekInterval'),
      value: GroupingIntervals.WEEK,
    },
    {
      key: GroupingIntervals.MONTH,
      text: t('allRunList.monthInterval'),
      value: GroupingIntervals.MONTH,
    },
    {
      key: GroupingIntervals.YEAR,
      text: t('allRunList.yearInterval'),
      value: GroupingIntervals.YEAR,
    },
  ];
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
  const [selectedGrouping, setSelectedGrouping] = useState<GroupingIntervals>(
    GroupingIntervals.MONTH,
  );

  const {
    runLogState,
    setRunLogState,
  } = useContext<RunLogContextInterface>(RunLogContext);

  function getRunGroups() {
    let keyFormatString: string;
    switch (selectedGrouping) {
      case GroupingIntervals.YEAR:
        keyFormatString = 'yyyy';
        break;
      case GroupingIntervals.MONTH:
        keyFormatString = 'yyyy LLLL';
        break;
      case GroupingIntervals.WEEK:
        keyFormatString = 'yyyy W';
        break;
      default:
        break;
    }
    const runGroups: Map<string, RunGroup> = new Map<string, RunGroup>();
    groupables.forEach((run) => {
      const currentKey = DateTime.fromJSDate(run.date).toFormat(keyFormatString);
      if (!runGroups.has(currentKey)) {
        runGroups.set(currentKey, { groupables: [], date: run.date });
      }
      runGroups.get(currentKey)!.groupables.push(run);
    });
    return Array.from(runGroups, ([, value]) => (value));
  }
  return (
    <div>
      <Container>
        <Form>
          <Form.Group inline widths="equal">
            <Form.Dropdown
              laceholder="None"
              label={t('allRunList.intervalLabel')}
              fluid
              inline
              selection
              options={groupingIntervalOptions}
              value={selectedGrouping}
              onChange={(event, data) => setSelectedGrouping(data.value as GroupingIntervals)}
            />
            <Form.Dropdown
              fluid
              selection
              inline
              label={t('allRunList.measurementLabel')}
              options={distanceMeasurementOptions}
              value={runLogState.distanceMeasurement}
              onChange={(event, data) => setRunLogState({
                ...runLogState,
                distanceMeasurement: data.value as DistanceMeasurements,
              })}
            />
            {runLogState.authState.userType === UserTypes.COACH
            && <AddCoachedAthleteModal />}
          </Form.Group>
        </Form>

      </Container>
      {isLoading ? <Segment placeholder><Loader active /></Segment>
        : (
          <table className="ui celled table">
            <thead>
              <tr>
                <th>{t('allRunList.dateHeader')}</th>
                <th>{t('allRunList.typeHeader')}</th>
                <th>{t('allRunList.titleHeader')}</th>
                <th>{t('allRunList.durationHeader')}</th>
                <th>{t('allRunList.distanceHeader')}</th>
                <th>{t('allRunList.paceHeader')}</th>
                <th className="one wide">{t('allRunList.actions')}</th>
              </tr>
            </thead>
            {getRunGroups().map((runGroup : RunGroup) => (
              <RunGroupTable
                runGroup={runGroup}
                groupBy={selectedGrouping}
                onDeleteClicked={deleteRunCallback}
              />
            ))}
          </table>
        )}

    </div>
  );
};
export default AllRunList;
