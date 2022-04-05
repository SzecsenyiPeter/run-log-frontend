import axios from 'axios';
import { Run } from './domain/Run';
import { RegisterUser } from './domain/RegisterUser';
import { LoginUser } from './domain/LoginUser';
import { LoginResponse } from './domain/LoginResponse';

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

async function registerUser(newUser: RegisterUser) {
  return axios.post('users/register', newUser);
}

async function loginUser(user: LoginUser) : Promise<LoginResponse> {
  const userResponse = await axios.post('users/login', user);
  return {
    username: userResponse.data.username,
    userType: userResponse.data.userType,
  };
}

export {
  addRun, getRuns, deleteRun, editRun, registerUser, loginUser,
};
