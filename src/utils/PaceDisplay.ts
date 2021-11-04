export default function formatPace(pace: number) {
  const minutes = Math.floor(pace);
  const seconds = (pace - minutes) * 60;
  return `${minutes}:${seconds.toFixed(0)}`;
}
