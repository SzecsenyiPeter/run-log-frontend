import { Run } from './domain/Run';

const runs : Run[] = [];

function addRun(run : Run) {
  runs.push(run);
  console.log(runs);
}

function getRuns() {
  return runs;
}
export { addRun, getRuns };
