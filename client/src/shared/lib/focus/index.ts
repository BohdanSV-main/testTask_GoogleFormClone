export function focusFirstError(container: HTMLElement | null) {
  requestAnimationFrame(() => {
    container?.querySelector<HTMLElement>('[aria-invalid="true"], [data-error-focus]')?.focus();
  });
}
