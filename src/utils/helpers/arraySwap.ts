export function arraySwap<T>(arr: T[], fromIndex: number, toIndex: number) {
  const copy = [...arr];
  const element = copy[fromIndex];
  copy.splice(fromIndex, 1, copy[toIndex]);
  copy.splice(toIndex, 1, element);
  return copy;
}
