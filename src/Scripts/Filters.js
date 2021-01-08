export function capitalizeFirst(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function anotherfunction(value) {
  return "" // dummy to not trigger linting on just 1 function and forcing exportdefault
}
