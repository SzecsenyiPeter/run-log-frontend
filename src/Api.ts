import axios from 'axios';
import { Run } from './domain/Run';
import { RegisterUser } from './domain/RegisterUser';
import { LoginUser } from './domain/LoginUser';
import { LoginResponse } from './domain/LoginResponse';
import { CreateRunPlan } from './domain/CreateRunPlan';

async function addRun(run : Run) {
  await axios.post('/runs', run);
}

async function getRuns(runner: string | null) {
  if (runner === null) {
    return (await axios.get('runs')).data.runs.map((run: any) => ({ ...run, date: new Date(run.date) }));
  }
  return (await axios.get(`runs?athlete=${runner}`)).data.runs.map((run: any) => ({ ...run, date: new Date(run.date) }));
}
async function getRunsOfCoachedAthletes() {
  return (await axios.get('runs/my-athletes')).data.runs.map((run: any) => ({ ...run, date: new Date(run.date) }));
}
async function deleteRun(id: string) {
  await axios.delete(`runs/${id}`);
}

async function editRun(runToEdit: Run) {
  await axios.put(`runs/${runToEdit.id}`, runToEdit);
}

async function getUnaffiliatedRunners() {
  return (await axios.get('users/athletes')).data;
}

async function getOwnRunners() {
  return (await axios.get<Array<string>>('users/athletes?show-own=true')).data;
}

async function setAthletesCoach(athleteName: string) {
  await axios.patch(`users/${athleteName}/coach`);
}

async function registerUser(newUser: RegisterUser) {
  return axios.post('users/register', newUser);
}

async function addRunPlan(createRunPlan: CreateRunPlan) {
  return axios.post('run-plans', createRunPlan);
}

async function getRunPlans(runner: string | null) {
  if (runner === null) {
    return (await axios.get('run-plans')).data.map((runPlan: any) => ({ ...runPlan, date: new Date(runPlan.date) }));
  }
  return (await axios.get(`run-plans?athlete=${runner}`)).data.map((runPlan: any) => ({ ...runPlan, date: new Date(runPlan.date) }));
}

async function loginUser(user: LoginUser) : Promise<LoginResponse> {
  const userResponse = await axios.post('users/login', user);
  console.log(userResponse);
  return {
    username: userResponse.data.username,
    userType: userResponse.data.userType,
  };
}

export {
  addRun,
  getRuns,
  deleteRun,
  editRun,
  registerUser,
  loginUser,
  getUnaffiliatedRunners,
  setAthletesCoach,
  addRunPlan,
  getOwnRunners,
  getRunPlans,
  getRunsOfCoachedAthletes,
};
