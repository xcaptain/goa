// TODO: please correct me later
export function isJSON(body: string): boolean {
  if (JSON.parse(body)) {
      return true;
  }
  return false;
}
