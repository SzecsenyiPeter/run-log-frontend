import { Run } from './domain/Run';

const runs : Run[] = [
  {
    title: 'nice', distanceInMeters: 2000, durationInSeconds: 12.1 * 60, date: new Date(),
  },
  {
    title: 'nice', distanceInMeters: 2000, durationInSeconds: 9.76 * 60, date: new Date(),
  },
  {
    title: 'nice', distanceInMeters: 3000, durationInSeconds: 16.3 * 60, date: new Date(),
  },
  {
    title: 'nice', distanceInMeters: 4321, durationInSeconds: 23.23123 * 60, date: new Date(),
  },
];

function addRun(run : Run) {
  runs.push(run);
  console.log(runs);
}

function getRuns() {
  return runs;
}
export { addRun, getRuns };
