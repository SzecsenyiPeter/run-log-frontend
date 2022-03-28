import React, { useContext, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import {
  Container, Form, Loader, Segment,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { getRuns, deleteRun } from '../Api';
import { RunGroup } from '../domain/RunGroup';
import RunGroupTable, { GroupingIntervals } from './RunGroupTable';
import { Run } from '../domain/Run';
import { DistanceMeasurementContextInterface, DistanceMeasurements, MeasurementContext } from '../App';

const AllRunList: React.FC = () => {
  const { t } = useTranslation();
  const [runs, setRuns] = useState<Array<Run>>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    setIsLoading(true);
    getRuns().then((result) => {
      setRuns(result);
      setIsLoading(false);
    });
  }, []);
  const deleteRunCallback = async (id: string) => {
    setIsLoading(true);
    await deleteRun(id);
    setRuns(await getRuns());
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
    distanceMeasurement,
    setDistanceMeasurement,
  } = useContext<DistanceMeasurementContextInterface>(MeasurementContext);

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
    runs.forEach((run) => {
      const currentKey = DateTime.fromJSDate(run.date).toFormat(keyFormatString);
      if (!runGroups.has(currentKey)) {
        runGroups.set(currentKey, { runs: [], date: run.date });
      }
      runGroups.get(currentKey)!.runs.push(run);
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
              value={distanceMeasurement}
              onChange={(event, data) => setDistanceMeasurement(data.value as DistanceMeasurements)}
            />
          </Form.Group>
        </Form>

      </Container>
      {isLoading ? <Segment placeholder><Loader active /></Segment>
        : (
          <table className="ui celled table">
            <thead>
              <tr>
                <th>{t('allRunList.dateHeader')}</th>
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
