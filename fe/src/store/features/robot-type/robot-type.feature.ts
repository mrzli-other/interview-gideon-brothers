import { createFeature, createReducer, on } from '@ngrx/store';
import { RobotType } from '../../../types';
import { RobotTypeActions } from './robot-type.actions';

export interface RobotTypeState {
  readonly robotTypes: readonly RobotType[] | undefined;
  readonly isLoading: boolean;
  readonly isSubmitting: boolean;
}

const initialState: RobotTypeState = {
  robotTypes: undefined,
  isLoading: false,
  isSubmitting: false,
};

export const robotTypeFeature = createFeature({
  name: 'RobotType',
  reducer: createReducer(
    initialState,
    on(RobotTypeActions.getAllPending, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(RobotTypeActions.getAllSuccess, (state, robotTypes) => ({
      ...state,
      robotTypes,
      isLoading: false,
    })),
    on(RobotTypeActions.getAllError, (state) => ({
      ...state,
      robotTypes: undefined,
      isLoading: false,
    })),
    on(RobotTypeActions.createPending, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(RobotTypeActions.createSuccess, (state, robotType) => ({
      ...state,
      robotTypes: [...(state.robotTypes ?? []), robotType],
      isSubmitting: false,
    })),
    on(RobotTypeActions.createError, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(RobotTypeActions.updatePending, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(RobotTypeActions.updateSuccess, (state, robotType) => ({
      ...state,
      robotTypes: state.robotTypes?.map((r) =>
        r.id === robotType.id ? robotType : r,
      ),
      isSubmitting: false,
    })),
    on(RobotTypeActions.updateError, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(RobotTypeActions.deletePending, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(RobotTypeActions.deleteSuccess, (state, deleteData) => ({
      ...state,
      robotTypes: state.robotTypes?.filter((r) => r.id !== deleteData.id),
      isSubmitting: false,
    })),
    on(RobotTypeActions.deleteError, (state) => ({
      ...state,
      isSubmitting: false,
    })),
  ),
});
