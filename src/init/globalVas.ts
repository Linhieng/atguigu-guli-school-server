export default function initGlobalVas () {
  Object.defineProperty(globalThis, 'SUCCESS', {
    value: 20000,
    writable: false,
  })
  Object.defineProperty(globalThis, 'ERROR', {
    value: 20001,
    writable: false,
  })
  Object.defineProperty(globalThis, 'SYNTAX_ERROR', {
    value: 20002,
    writable: false,
  })
  Object.defineProperty(globalThis, 'READ_ERROR', {
    value: 20003,
    writable: false,
  })
  Object.defineProperty(globalThis, 'M_VALIDATION_ERROR', {
    value: 20004,
    writable: false,
  })
  Object.defineProperty(globalThis, 'M_CAST_ERROR', {
    value: 20005,
    writable: false,
  })
}