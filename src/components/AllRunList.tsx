import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import {
  Container, DropdownItemProps, Form, Loader, Segment,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import {
  deleteRun, getOwnRunners, getRunPlans, getRuns, getRunsOfCoachedAthletes,
} from '../Api';
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
  const [selectableAthleteOptions, setSelectableAthleteOptions] = useState<DropdownItemProps[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<string>('');
  const [isTableLoading, setIsTableLoading] = useState<boolean>();
  const [areAthletesLoading, setAreAthletesLoading] = useState<boolean>();

  const {
    runLogState,
    setRunLogState,
  } = useContext<RunLogContextInterface>(RunLogContext);

  function loadGroupables() {
    const athlete = runLogState.authState.userType
    === UserTypes.COACH ? selectedAthlete : userToShow;
    if (athlete === '') {
      getRunsOfCoachedAthletes().then((runResult) => {
        const runs: Array<Run> = runResult;
        setGroupables(runs.sort((first, second) => first.date.getTime() - second.date.getTime()));
        setIsTableLoading(false);
      });
    } else {
      getRuns(athlete).then((runResult) => {
        const runs: Array<Run> = runResult;
        getRunPlans(athlete).then((runPlanResult) => {
          const runPlans: Array<RunPlan> = runPlanResult;
          const newGroupables : (Run | RunPlan)[] = [];
          setGroupables(newGroupables
            .concat(runs, runPlans)
            .sort((first, second) => first.date.getTime() - second.date.getTime()));
          setIsTableLoading(false);
        });
      });
    }
  }

  function loadSelectableAthleteOptions() {
    getOwnRunners().then((runners) => {
      setSelectableAthleteOptions(runners.map((runner, index) => ({
        key: index,
        text: runner,
        value: runner,
      })));
      setAreAthletesLoading(false);
    });
  }

  useEffect(() => {
    if (runLogState.authState.userType === UserTypes.ATHLETE) {
      setIsTableLoading(true);
      loadGroupables();
    }
  }, []);

  useEffect(() => {
    setAreAthletesLoading(true);
    loadSelectableAthleteOptions();
  }, []);
  useEffect(() => {
    setIsTableLoading(true);
    loadGroupables();
  }, [selectedAthlete]);
  const deleteRunCallback = async (id: string) => {
    setIsTableLoading(true);
    await deleteRun(id);
    loadGroupables();
    setIsTableLoading(false);
  };
  const athleteSelectedCallback = async (athlete: string) => {
    setSelectedAthlete(athlete);
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
    console.log(groupables);
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
            {runLogState.authState.userType === UserTypes.COACH
            && (
            <Form.Dropdown
              placeholder="None"
              label={t('allRunList.selectedAthleteLabel')}
              fluid
              inline
              selection
              clearable
              search
              loading={areAthletesLoading}
              options={selectableAthleteOptions}
              value={selectedAthlete}
              onChange={(event, data) => athleteSelectedCallback(data.value as string)}
            />
            )}
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
      {isTableLoading ? <Segment placeholder><Loader active /></Segment>
        : (
          <table className="ui celled table">
            <thead>
              <tr>
                {runLogState.authState.userType === UserTypes.COACH
                && <th>{t('allRunList.nameHeader')}</th> }
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
