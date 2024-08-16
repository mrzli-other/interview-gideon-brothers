import type { Except } from 'type-fest';

export interface Robot {
  readonly id: number;
  readonly name: string;
  readonly robotTypeId: number;
}

export type RobotCreate = Except<Robot, 'id'>;
export type RobotUpdate = Robot;
