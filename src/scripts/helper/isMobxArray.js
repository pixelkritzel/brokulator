export default function isMobxArray(arr) {
  return arr && ( Array.isArray(arr) || ( arr.slice && Array.isArray(arr.slice()) ) );
}