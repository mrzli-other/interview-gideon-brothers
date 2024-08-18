import { Point } from './geometry';

export interface RobotType {
  readonly id: number;
  readonly name: string;
  readonly dimensions: readonly Point[];
}

export type RobotTypeCreate = Omit<RobotType, 'id'>;
export type RobotTypeUpdate = RobotType;
