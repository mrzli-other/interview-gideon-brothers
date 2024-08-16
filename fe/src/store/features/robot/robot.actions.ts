import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Robot, RobotCreate } from '../../../types';
import { ActionPayload, DeleteData, ErrorData } from '../../types';

export const RobotActions = createActionGroup({
  source: 'Robot',
  events: {
    'Get All': emptyProps(),
    'Get All Pending': emptyProps(),
    'Get All Success': props<ActionPayload<readonly Robot[]>>(),
    'Get All Error': props<ErrorData>(),
    Create: props<ActionPayload<RobotCreate>>(),
    'Create Pending': emptyProps(),
    'Create Success': props<ActionPayload<Robot>>(),
    'Create Error': props<ErrorData>(),
    Get: props<ActionPayload<{ readonly id: number }>>(),
    'Get Pending': emptyProps(),
    'Get Success': props<ActionPayload<Robot>>(),
    'Get Error': props<ErrorData>(),
    Update: props<ActionPayload<Robot>>(),
    'Update Pending': emptyProps(),
    'Update Success': props<ActionPayload<Robot>>(),
    'Update Error': props<ErrorData>(),
    Delete: props<ActionPayload<DeleteData>>(),
    'Delete Pending': emptyProps(),
    'Delete Success': props<ActionPayload<DeleteData>>(),
    'Delete Error': props<ErrorData>(),
  },
});
