import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RobotType, RobotTypeCreate } from '../../../types';
import { ActionPayload, DeleteData, ErrorData } from '../../types';

export const RobotTypeActions = createActionGroup({
  source: 'Robot Type',
  events: {
    'Get All': emptyProps(),
    'Get All Pending': emptyProps(),
    'Get All Success': props<ActionPayload<readonly RobotType[]>>(),
    'Get All Error': props<ErrorData>(),
    Create: props<ActionPayload<RobotTypeCreate>>(),
    'Create Pending': emptyProps(),
    'Create Success': props<ActionPayload<RobotType>>(),
    'Create Error': props<ErrorData>(),
    Get: props<ActionPayload<{ readonly id: number }>>(),
    'Get Pending': emptyProps(),
    'Get Success': props<ActionPayload<RobotType>>(),
    'Get Error': props<ErrorData>(),
    Update: props<ActionPayload<RobotType>>(),
    'Update Pending': emptyProps(),
    'Update Success': props<ActionPayload<RobotType>>(),
    'Update Error': props<ErrorData>(),
    Delete: props<ActionPayload<DeleteData>>(),
    'Delete Pending': emptyProps(),
    'Delete Success': props<ActionPayload<DeleteData>>(),
    'Delete Error': props<ErrorData>(),
  },
});
