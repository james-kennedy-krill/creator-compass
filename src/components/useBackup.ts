import { useCallback } from 'react';
import { useCourse } from '../state/CourseContext';
import { exportBackup, parseBackup } from '../state/storage';
import type { CourseState } from '../state/types';
import { useToast } from './Toast';

/** Export and import version 1 progress backups. */
export function useBackup() {
  const { state, dispatch } = useCourse();
  const toast = useToast();

  const exportProgress = useCallback(() => {
    exportBackup(state);
    toast('Progress backup downloaded');
  }, [state, toast]);

  const importProgress = useCallback(
    (onImported?: (imported: CourseState) => void) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json,application/json';
      input.addEventListener('change', async () => {
        const file = input.files?.[0];
        if (!file) return;
        try {
          const imported = parseBackup(await file.text());
          dispatch({ type: 'replace', state: imported });
          onImported?.(imported);
          toast('Progress imported');
        } catch (error) {
          alert('Could not import: ' + (error instanceof Error ? error.message : String(error)));
        }
      });
      input.click();
    },
    [dispatch, toast],
  );

  return { exportProgress, importProgress };
}
