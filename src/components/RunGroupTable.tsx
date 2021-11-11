import React from 'react';
import { DateTime } from 'luxon';
import { MdDelete, MdEditNote } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { calculatePaceInUnit, PaceUnit, Run } from '../domain/Run';
import formatPace from '../utils/PaceDisplay';
import { RunGroup } from '../domain/RunGroup';
import '../style/hoverStyle.css';

export enum GroupingIntervals {
  YEAR,
  MONTH,
  WEEK,
}

interface OnRunClicked {
  (id: string) : void;
}

interface RunGroupTableProps {
  runGroup: RunGroup;
  groupBy: GroupingIntervals;
  onDeleteClicked: OnRunClicked;
}

const RunGroupTable: React.FC<RunGroupTableProps> = (props) => {
  const { runGroup, groupBy, onDeleteClicked } = props;
  const history = useHistory();
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
      <tr className="active center aligned"><td colSpan={6} style={{ fontWeight: 'bold' }}>{getGroupDateFormatted()}</td></tr>
      {runs.map((run : Run) => (
        <tr>
          <td>{run.date.toLocaleDateString()}</td>
          <td>{run.title}</td>
          <td>{`${formatPace(run.durationInSeconds / 60)}`}</td>
          <td>{`${(run.distanceInMeters / 1000).toFixed(2)} km`}</td>
          <td>{`${formatPace(calculatePaceInUnit(run, PaceUnit.MINUTES_PER_KILOMETER))} m/km`}</td>
          <td className="center aligned">
            <MdEditNote size="2em" className="editButton" onClick={() => history.push({ pathname: '/edit', state: { id: run.id } })} />
            <MdDelete size="2em" className="deleteButton" onClick={() => onDeleteClicked(run.id!)} />
          </td>
        </tr>
      ))}
    </>
  );
};
export default RunGroupTable;
