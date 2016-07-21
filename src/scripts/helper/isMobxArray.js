export default function isMobxArray(arr) {
  return arr && ( Array.isArray(arr) || Array.isArray(arr.slice()) );
}