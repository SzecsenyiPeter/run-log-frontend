import { Run } from './domain/Run';

let runs : Run[] = [
  {
    id: '1', title: 'nice', distanceInMeters: 2000, durationInSeconds: 12.1 * 60, date: new Date(),
  },
  {
    id: '2', title: 'nice', distanceInMeters: 2000, durationInSeconds: 9.76 * 60, date: new Date(),
  },
  {
    id: '3', title: 'nice', distanceInMeters: 3000, durationInSeconds: 16.3 * 60, date: new Date(),
  },
  {
    id: '4', title: 'nice', distanceInMeters: 4321, durationInSeconds: 23.23123 * 60, date: new Date(),
  },
];

function addRun(run : Run) {
  runs.push(run);
  console.log(runs);
}

function getRuns() {
  return runs;
}
function deleteRun(id: string) {
  const index = runs.findIndex((run) => run.id === id);
  if (index > -1) {
    runs.splice(index, 1);
  }
  runs = runs.filter((run) => run.id !== id);
}

function editRun(runToEdit: Run) {
  const index = runs.findIndex((run) => run.id === runToEdit.id);
  if (index > -1) {
    runs[index] = runToEdit;
  }
}

export {
  addRun, getRuns, deleteRun, editRun,
};
