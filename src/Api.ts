import axios from 'axios';
import { Run } from './domain/Run';

async function addRun(run : Run) {
  await axios.post('/runs', run);
}

async function getRuns() {
  const response = await axios.get('/runs');
  return response.data.runs.map((run: any) => ({ ...run, date: new Date(run.date) }));
}
async function deleteRun(id: string) {
  await axios.delete(`runs/${id}`);
}

async function editRun(runToEdit: Run) {
  await axios.put(`runs/${runToEdit.id}`, runToEdit);
}

export {
  addRun, getRuns, deleteRun, editRun,
};
