import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { Container, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { getRuns } from '../Api';
import { RunGroup } from '../domain/RunGroup';
import RunGroupTable, { GroupingIntervals } from './RunGroupTable';

const AllRunList: React.FC = () => {
  const { t } = useTranslation();
  const runs = getRuns();
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
        <Dropdown
          placeholder="None"
          fluid
          selection
          options={groupingIntervalOptions}
          value={GroupingIntervals.MONTH}
          onChange={(event, data) => setSelectedGrouping(data.value as GroupingIntervals)}
        />
      </Container>
      <table className="ui celled table">
        <thead>
          <th>{t('allRunList.dateHeader')}</th>
          <th>{t('allRunList.titleHeader')}</th>
          <th>{t('allRunList.durationHeader')}</th>
          <th>{t('allRunList.distanceHeader')}</th>
          <th>{t('allRunList.paceHeader')}</th>
        </thead>
        {getRunGroups().map((runGroup : RunGroup) => (
          <RunGroupTable runGroup={runGroup} groupBy={selectedGrouping} />
        ))}
      </table>
    </div>
  );
};
export default AllRunList;
