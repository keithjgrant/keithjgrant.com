export function findLinkToNote(container, noteUrl) {
  return container.querySelector(`[data-href="${noteUrl}"]`);
}
