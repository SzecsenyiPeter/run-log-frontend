import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdEditNote } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { calculatePaceInUnit, PaceUnit, Run } from '../domain/Run';
import formatPace from '../utils/PaceDisplay';
import { RunGroup } from '../domain/RunGroup';
import '../style/hoverStyle.css';
import { DistanceMeasurementContextInterface, DistanceMeasurements, MeasurementContext } from '../App';

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
  const { t } = useTranslation();
  const {
    distanceMeasurement,
  } = useContext<DistanceMeasurementContextInterface>(MeasurementContext);
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
  function getDistanceInMeasurement(distance: number) {
    switch (distanceMeasurement) {
      case DistanceMeasurements.KILOMETRES:
        return `${(distance / 1000).toFixed(2)} km`;
      case DistanceMeasurements.MILES:
        return `${(distance / 1609).toFixed(2)} m`;
      default:
        return '';
    }
  }
  function getPaceInMeasurement(duration: number, distance: number) {
    switch (distanceMeasurement) {
      case DistanceMeasurements.KILOMETRES:
        return `${formatPace(calculatePaceInUnit(duration, distance, PaceUnit.MINUTES_PER_KILOMETER))} ${t('paceUnitShortKilometres')}`;
      case DistanceMeasurements.MILES:
        return `${formatPace(calculatePaceInUnit(duration, distance, PaceUnit.MINUTES_PER_MILE))} ${t('paceUnitShortMiles')}`;
      default:
        return '';
    }
  }
  function getTotalDistance() {
    return runs.reduce<number>((sum, run) => sum + run.distanceInMeters, 0);
  }
  function getTotalTime() {
    return runs.reduce<number>((sum, run) => sum + run.durationInSeconds, 0);
  }
  return (
    <>
      <tr className="active center aligned"><td colSpan={6} style={{ fontWeight: 'bold' }}>{getGroupDateFormatted()}</td></tr>
      {runs.map((run : Run) => (
        <tr>
          <td>{run.date.toLocaleDateString()}</td>
          <td>{run.title}</td>
          <td>{`${formatPace(run.durationInSeconds / 60)}`}</td>
          <td>{getDistanceInMeasurement(run.distanceInMeters)}</td>
          <td>{getPaceInMeasurement(run.durationInSeconds, run.distanceInMeters)}</td>
          <td className="center aligned">
            <MdEditNote size="2em" className="editButton" onClick={() => history.push({ pathname: '/edit', state: { id: run.id } })} />
            <MdDelete size="2em" className="deleteButton" onClick={() => onDeleteClicked(run.id!)} />
          </td>
        </tr>
      ))}
      <tr style={{ fontWeight: 'bold', color: '#6435c9 !important' }}>
        <td style={{ color: '#6435c9' }}>{t('runGroupTable.overview')}</td>
        <td />
        <td style={{ color: '#6435c9' }}>{`${formatPace(getTotalTime() / 60)}`}</td>
        <td style={{ color: '#6435c9' }}>{getDistanceInMeasurement(getTotalDistance())}</td>
        <td style={{ color: '#6435c9' }}>{getPaceInMeasurement(getTotalTime(), getTotalDistance())}</td>
        <td />
      </tr>
    </>
  );
};
export default RunGroupTable;
