import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdEditNote } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCalendar, BiRun } from 'react-icons/all';
import { calculatePaceInUnit, PaceUnit, Run } from '../domain/Run';
import formatPace from '../utils/PaceDisplay';
import { RunGroup } from '../domain/RunGroup';
import '../style/hoverStyle.css';
import {
  DistanceMeasurements,
  RunLogContext,
  RunLogContextInterface,
} from '../App';
import { RunPlan } from '../domain/RunPlan';
import { UserTypes } from '../domain/RegisterUser';

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
function isRun(groupable: Run | RunPlan): groupable is Run {
  return (groupable as Run).heartRate !== undefined;
}
function isRunPlan(groupable: Run | RunPlan): groupable is RunPlan {
  return (groupable as RunPlan).instructions !== undefined;
}
const RunGroupTable: React.FC<RunGroupTableProps> = (props) => {
  const { runGroup, groupBy, onDeleteClicked } = props;
  const navigate = useNavigate();
  const { groupables, date } = runGroup;
  const { t } = useTranslation();
  const {
    runLogState,
  } = useContext<RunLogContextInterface>(RunLogContext);
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
    switch (runLogState.distanceMeasurement) {
      case DistanceMeasurements.KILOMETRES:
        return `${(distance / 1000).toFixed(2)} km`;
      case DistanceMeasurements.MILES:
        return `${(distance / 1609).toFixed(2)} m`;
      default:
        return '';
    }
  }
  function getPaceInMeasurement(duration: number, distance: number) {
    switch (runLogState.distanceMeasurement) {
      case DistanceMeasurements.KILOMETRES:
        return `${formatPace(calculatePaceInUnit(duration, distance, PaceUnit.MINUTES_PER_KILOMETER))} ${t('paceUnitShortKilometres')}`;
      case DistanceMeasurements.MILES:
        return `${formatPace(calculatePaceInUnit(duration, distance, PaceUnit.MINUTES_PER_MILE))} ${t('paceUnitShortMiles')}`;
      default:
        return '';
    }
  }
  function getTotalDistance() {
    return groupables
      .filter<Run>(isRun)
      .reduce<number>((sum, run) => sum + run.distanceInMeters, 0);
  }
  function getTotalTime() {
    return groupables
      .filter<Run>(isRun)
      .reduce<number>((sum, run) => sum + run.durationInSeconds, 0);
  }
  return (
    <>
      <tr className="active center aligned"><td colSpan={7} style={{ fontWeight: 'bold' }}>{getGroupDateFormatted()}</td></tr>
      {groupables.map((groupable) => (
        <>
          {isRun(groupable) && (
            <tr>
              {runLogState.authState.userType === UserTypes.COACH
              && <td>{groupable.name}</td> }
              <td>{groupable.date.toLocaleDateString()}</td>
              <td className="center aligned"><BiRun size="1.4em" style={{ color: '#6435c9' }} /></td>
              <td>
                {groupable.title}
              </td>
              <td>{`${formatPace(groupable.durationInSeconds / 60)}`}</td>
              <td>{getDistanceInMeasurement(groupable.distanceInMeters)}</td>
              <td>
                {
                  getPaceInMeasurement(groupable.durationInSeconds, groupable.distanceInMeters)
                }
              </td>
              <td className="center aligned">
                <MdEditNote size="2em" className="editButton" onClick={() => navigate('/edit', { state: { id: groupable.id! } })} />
                <MdDelete size="2em" className="deleteButton" onClick={() => onDeleteClicked(groupable.id!)} />
              </td>
            </tr>
          )}
          {isRunPlan(groupable) && (
          <tr>
            {runLogState.authState.userType === UserTypes.COACH
            && <td>{groupable.assignedTo}</td> }
            <td>{groupable.date.toLocaleDateString()}</td>
            <td className="center aligned"><AiOutlineCalendar size="1.4em" style={{ color: '#6435c9' }} /></td>
            <td>
              {groupable.instructions}
            </td>
            <td />
            <td>{groupable.distance !== undefined ? getDistanceInMeasurement(groupable.distance) : ''}</td>
            <td />
            <td />
          </tr>
          )}
        </>

      ))}
      <tr style={{ fontWeight: 'bold', color: '#6435c9 !important' }}>
        <td style={{ color: '#6435c9' }}>{t('runGroupTable.overview')}</td>
        <td />
        {runLogState.authState.userType === UserTypes.COACH
        && <td /> }
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
