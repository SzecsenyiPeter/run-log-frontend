import React from 'react';
import { DateTime } from 'luxon';
import { Run } from '../domain/Run';
import { RunGroup } from '../domain/RunGroup';

export enum GroupingIntervals {
  YEAR,
  MONTH,
  WEEK,
}

interface RunGroupTableProps {
  runGroup: RunGroup;
  groupBy: GroupingIntervals;
}

const RunGroupTable: React.FC<RunGroupTableProps> = (props) => {
  const { runGroup, groupBy } = props;
  const { runs, date } = runGroup;

  function getGroupDateFormatted() {
    const dateTime = DateTime.fromJSDate(date);
    switch (groupBy) {
      case GroupingIntervals.YEAR:
        return dateTime.toFormat('yyyy');
      case GroupingIntervals.MONTH:
        return dateTime.toLocaleString({ month: 'long', year: 'numeric' });
      case GroupingIntervals.WEEK:
        return `${dateTime.toFormat('yyyy,  W')}.`;
      default:
        return date.toDateString();
    }
  }
  return (
    <>
      <tr className="active center aligned"><td colSpan={5} style={{ fontWeight: 'bold' }}>{getGroupDateFormatted()}</td></tr>
      {runs.map((run : Run) => (
        <tr>
          <td>{run.date.toLocaleDateString()}</td>
          <td>{run.title}</td>
          <td>{`${run.durationInSeconds / 60} m`}</td>
          <td>{`${run.distanceInMeters / 1000} km`}</td>
        </tr>
      ))}
    </>
  );
};
export default RunGroupTable;
