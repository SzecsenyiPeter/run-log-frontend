import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  Divider, Grid, Header, List, Loader, Segment,
} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { getRun } from '../Api';
import { calculatePaceInUnitFromSecondsPerMeters, PaceUnit, Run } from '../domain/Run';
import { DistanceMeasurements, RunLogContext, RunLogContextInterface } from '../App';
import formatPace from '../utils/PaceDisplay';
import LinkRunWithPlanModal from './LinkRunWithPlanModal';

const RunPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [run, setRun] = useState<Run>();
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    runLogState,
  } = useContext<RunLogContextInterface>(RunLogContext);
  function isLinkedWithRunPlan() {
    return run?.completedRunPlan !== null;
  }
  function getDistanceInMeasurement(distance: number | undefined) {
    if (distance !== undefined) {
      switch (runLogState.distanceMeasurement) {
        case DistanceMeasurements.KILOMETRES:
          return `${(distance / 1000).toFixed(2)} km`;
        case DistanceMeasurements.MILES:
          return `${(distance / 1609).toFixed(2)} m`;
        default:
          return '';
      }
    }
    return '';
  }
  function getPaceInMeasurement(secondsPerMeter: number | undefined) {
    if (secondsPerMeter !== undefined) {
      switch (runLogState.distanceMeasurement) {
        case DistanceMeasurements.KILOMETRES:
          return `${formatPace(calculatePaceInUnitFromSecondsPerMeters(Math.abs(secondsPerMeter), PaceUnit.MINUTES_PER_KILOMETER))} ${t('paceUnitShortKilometres')}`;
        case DistanceMeasurements.MILES:
          return `${formatPace(calculatePaceInUnitFromSecondsPerMeters(Math.abs(secondsPerMeter), PaceUnit.MINUTES_PER_MILE))} ${t('paceUnitShortMiles')}`;
        default:
          return '';
      }
    }
    return '';
  }
  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getRun(parseInt(id, 10)).then((result) => {
        setIsLoading(false);
        setRun(result);
      });
    }
  }, []);
  const comparison = useMemo(() => {
    const positiveColor = '#059e53';
    const negativeColor = '#B03060';
    let heartRateComparison = null;
    let distanceComparison = null;
    let durationComparison = null;
    let paceComparison = null;
    if (run !== undefined && run.completedRunPlan !== null) {
      if (run.completedRunPlan.heartRate !== undefined) {
        const difference = run.heartRate - run.completedRunPlan.heartRate;
        const ratio = run.completedRunPlan.heartRate / run.heartRate;
        heartRateComparison = {
          differenceText: difference > 0 ? `+${difference.toString(10)}` : difference.toString(10),
          color: (ratio > 0.97 && ratio < 1.03) ? positiveColor : negativeColor,
        };
      }
      const distanceDifference = run.distanceInMeters - run.completedRunPlan.distance;
      const distanceRatio = run.distanceInMeters / run.completedRunPlan.distance;
      distanceComparison = {
        differenceText: distanceDifference > 0 ? `+${getDistanceInMeasurement(distanceDifference)}` : getDistanceInMeasurement(distanceDifference),
        color: (distanceRatio > 0.97 && distanceRatio < 1.03) ? positiveColor : negativeColor,
      };
      if (run.completedRunPlan.duration !== undefined) {
        const durationDifference = (run.durationInSeconds - run.completedRunPlan.duration) / 60;
        const durationRatio = run.completedRunPlan.duration / run.durationInSeconds;
        durationComparison = {
          differenceText: durationDifference > 0 ? `+${formatPace(durationDifference)}` : formatPace(durationDifference),
          color: (durationRatio > 0.95 && durationRatio < 1.05) ? positiveColor : negativeColor,
        };
        const runSecondsPerMeters = run.durationInSeconds / run.distanceInMeters;
        const runPlanSecondsPerMeters = run.completedRunPlan.duration
            / run.completedRunPlan.distance;
        const paceDifference = runSecondsPerMeters - runPlanSecondsPerMeters;
        const paceRatio = durationRatio / distanceRatio;
        paceComparison = {
          differenceText: paceDifference > 0 ? `+${getPaceInMeasurement(paceDifference)}` : `-${getPaceInMeasurement(paceDifference)}`,
          color: (paceRatio > 0.95 && paceRatio < 1.05) ? positiveColor : negativeColor,
        };
      }
    }
    return {
      heartRateComparison, distanceComparison, durationComparison, paceComparison,
    };
  }, [run]);
  return (
    <>
      {isLoading ? <Segment placeholder><Loader active /></Segment> : (

        <Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <Header as="h2" style={{ marginBottom: '5px' }}>{run?.title}</Header>
              {isLinkedWithRunPlan()
              && <Header as="h3" color="violet" style={{ marginTop: '5px', marginBottom: '5px' }}>{run?.completedRunPlan?.instructions}</Header>}
              <p>
                <b>{run?.name}</b>
                {' at '}
                {run?.date !== undefined ? new Date(run?.date).toLocaleDateString() : ''}
              </p>
              <Header as="h3">{t('runPage.description')}</Header>
              <p>{run?.description}</p>
            </Grid.Column>
            <Grid.Column>
              <Header as="h2" style={{ marginBottom: '5px' }}>{t('runPage.stats')}</Header>
              {isLinkedWithRunPlan()
              && (
              <Header as="h3" style={{ marginTop: '5px' }}>
                {t('runPage.actual')}
                /
                <span style={{ color: '#6435c9' }}>{t('runPage.described')}</span>
              </Header>
              )}
              <List divided relaxed size="large">
                <List.Item>
                  <List.Content>
                    {comparison.distanceComparison !== null ? (
                      <>
                        <List.Header>
                          {getDistanceInMeasurement(run?.distanceInMeters)}
                          /
                          <span style={{ color: '#6435c9' }}>{getDistanceInMeasurement(run?.completedRunPlan?.distance)}</span>
                        </List.Header>
                        <List.Description>
                          {t('runPage.difference')}
                          {' '}
                          <span
                            style={{ color: comparison.distanceComparison.color }}
                          >
                            {comparison.distanceComparison.differenceText}
                          </span>
                        </List.Description>
                      </>
                    ) : (
                      <>
                        <List.Header>
                          {getDistanceInMeasurement(run?.distanceInMeters)}
                        </List.Header>
                        <List.Description>{t('runPage.distance')}</List.Description>
                      </>
                    ) }
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {comparison.durationComparison !== null ? (
                      <>
                        <List.Header>
                          {formatPace(run?.durationInSeconds / 60)}
                          /
                          <span style={{ color: '#6435c9' }}>{formatPace(run?.completedRunPlan.duration / 60)}</span>
                        </List.Header>
                        <List.Description>
                          {t('runPage.difference')}
                          {' '}
                          <span
                            style={{ color: comparison.durationComparison.color }}
                          >
                            {comparison.durationComparison.differenceText}
                          </span>
                        </List.Description>
                      </>
                    ) : (
                      <>
                        <List.Header>
                          {formatPace(run?.durationInSeconds / 60)}
                        </List.Header>
                        <List.Description>{t('runPage.duration')}</List.Description>
                      </>
                    ) }
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {comparison.paceComparison !== null ? (
                      <>
                        <List.Header>
                          {getPaceInMeasurement(run?.durationInSeconds / run?.distanceInMeters)}
                          /
                          <span style={{ color: '#6435c9' }}>{getPaceInMeasurement(run?.completedRunPlan.duration / run?.completedRunPlan.distance)}</span>
                        </List.Header>
                        <List.Description>
                          {t('runPage.difference')}
                          {' '}
                          <span
                            style={{ color: comparison.paceComparison.color }}
                          >
                            {comparison.paceComparison.differenceText}
                          </span>
                        </List.Description>
                      </>
                    ) : (
                      <>
                        <List.Header>
                          {getPaceInMeasurement(run?.durationInSeconds / run?.distanceInMeters)}
                        </List.Header>
                        <List.Description>{t('runPage.pace')}</List.Description>
                      </>
                    ) }
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    {comparison.heartRateComparison !== null ? (
                      <>
                        <List.Header>
                          {run?.heartRate}
                          /
                          <span style={{ color: '#6435c9' }}>{`${run?.completedRunPlan?.heartRate} ${t('runForm.heartRateUnit')}`}</span>
                        </List.Header>
                        <List.Description>
                          {t('runPage.difference')}
                          {' '}
                          <span
                            style={{ color: comparison.heartRateComparison.color }}
                          >
                            {comparison.heartRateComparison.differenceText}
                          </span>
                        </List.Description>
                      </>
                    ) : (
                      <>
                        <List.Header>
                          {run?.heartRate}
                        </List.Header>
                        <List.Description>{t('runPage.heartRate')}</List.Description>
                      </>
                    ) }
                  </List.Content>
                </List.Item>
              </List>
              {!isLinkedWithRunPlan()
              && <LinkRunWithPlanModal runId={parseInt(run?.id as string, 10)} />}
            </Grid.Column>
          </Grid>
          <Divider vertical />
        </Segment>
      )}
    </>
  );
};
export default RunPage;
