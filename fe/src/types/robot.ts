export interface Robot {
  readonly id: number;
  readonly name: string;
  readonly robotType: number;
}

export type RobotCreate = Omit<Robot, 'id'>;
