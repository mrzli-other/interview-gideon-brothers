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
    on(RobotTypeActions.getAllSuccess, (state, action) => ({
      ...state,
      robotTypes: action.payload,
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
    on(RobotTypeActions.createSuccess, (state, action) => ({
      ...state,
      robotTypes:
        state.robotTypes !== undefined
          ? [...state.robotTypes, action.payload]
          : [action.payload],
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
    on(RobotTypeActions.updateSuccess, (state, action) => ({
      ...state,
      robotTypes: state.robotTypes?.map((r) =>
        r.id === action.payload.id ? action.payload : r,
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
    on(RobotTypeActions.deleteSuccess, (state, action) => ({
      ...state,
      robotTypes: state.robotTypes?.filter((r) => r.id !== action.payload.id),
      isSubmitting: false,
    })),
    on(RobotTypeActions.deleteError, (state) => ({
      ...state,
      isSubmitting: false,
    })),
  ),
});
