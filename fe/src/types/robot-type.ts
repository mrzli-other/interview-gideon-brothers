export interface RobotType {
  readonly id: number;
  readonly name: string;
  readonly dimensions: string;
}

export type RobotTypeCreate = Omit<RobotType, 'id'>;
export type RobotTypeUpdate = RobotType;
