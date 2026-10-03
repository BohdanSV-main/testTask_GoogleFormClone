import { Component, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Button } from '@/shared/ui/button';
import { StatePanel } from '@/shared/ui/state-panel';
import { store } from '../store';

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <StatePanel
          alert
          icon="!"
          title="Щось пішло не так."
          description="Не вдалося відобразити сторінку. Спробуйте відкрити її ще раз."
          action={<Button onClick={() => window.location.reload()}>Оновити сторінку ↻</Button>}
        />
      );
    }

    return this.props.children;
  }
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppErrorBoundary>
      <Provider store={store}>{children}</Provider>
    </AppErrorBoundary>
  );
}
