import { createFeature, createReducer, on } from '@ngrx/store';
import { Robot } from '../../../types';
import { RobotActions } from './robot.actions';

export interface RobotState {
  readonly robots: readonly Robot[] | undefined;
  readonly isLoading: boolean;
  readonly isSubmitting: boolean;
}

const initialState: RobotState = {
  robots: undefined,
  isLoading: false,
  isSubmitting: false,
};

export const robotFeature = createFeature({
  name: 'Robot',
  reducer: createReducer(
    initialState,
    on(RobotActions.getAllPending, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(RobotActions.getAllSuccess, (state, action) => ({
      ...state,
      robots: action.payload,
      isLoading: false,
    })),
    on(RobotActions.getAllError, (state) => ({
      ...state,
      robots: undefined,
      isLoading: false,
    })),
    on(RobotActions.createPending, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(RobotActions.createSuccess, (state, action) => ({
      ...state,
      robots:
        state.robots !== undefined
          ? [...state.robots, action.payload]
          : [action.payload],
      isSubmitting: false,
    })),
    on(RobotActions.createError, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(RobotActions.updatePending, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(RobotActions.updateSuccess, (state, action) => ({
      ...state,
      robots: state.robots?.map((r) =>
        r.id === action.payload.id ? action.payload : r,
      ),
      isSubmitting: false,
    })),
    on(RobotActions.updateError, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(RobotActions.deletePending, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(RobotActions.deleteSuccess, (state, action) => ({
      ...state,
      robots: state.robots?.filter((r) => r.id !== action.payload.id),
      isSubmitting: false,
    })),
    on(RobotActions.deleteError, (state) => ({
      ...state,
      isSubmitting: false,
    })),
  ),
});
