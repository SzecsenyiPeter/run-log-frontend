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
    id: '5', title: 'nice', distanceInMeters: 4321, durationInSeconds: 23.23123 * 60, date: new Date(),
  },
  {
    id: '6', title: 'nice', distanceInMeters: 12000, durationInSeconds: 74.32 * 60, date: new Date(1603621021000),
  },
  {
    id: '7', title: 'nice', distanceInMeters: 8200, durationInSeconds: 40.51 * 60, date: new Date(1603621021000),
  },
  {
    id: '8', title: 'nice', distanceInMeters: 4050, durationInSeconds: 15.72 * 60, date: new Date(1602757021000),
  },
  {
    id: '9', title: 'nice', distanceInMeters: 12500, durationInSeconds: 68.67 * 60, date: new Date(1601893021000),
  },
  {
    id: '10', title: 'nice', distanceInMeters: 6010, durationInSeconds: 35.42 * 60, date: new Date(1599301021000),
  },

  {
    id: '11', title: 'nice', distanceInMeters: 15330, durationInSeconds: 95.21 * 60, date: new Date(1599301021000),
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
