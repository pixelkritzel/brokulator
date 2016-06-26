export default function generateId() {
  const now = (new Date).getTime();
  const random = Math.floor((1 + Math.random()) * 100000000000000000)
                     .toString(16)
                     .substring(1);
  return now + random;
}