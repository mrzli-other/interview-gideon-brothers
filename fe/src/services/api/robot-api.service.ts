import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Robot, RobotCreate, RobotUpdate } from '../../types';
import { map, Observable, OperatorFunction } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import type { Except } from 'type-fest';

@Injectable({
  providedIn: 'root',
})
export class RobotApiService {
  private readonly apiBaseUrl: string;

  public constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService,
  ) {
    this.apiBaseUrl = this.configService.configOptions.apiBaseUrl;
  }

  public getAllRobots(): Observable<readonly Robot[]> {
    return this.http
      .get<readonly RobotDto[]>(this.url('/api/robots'))
      .pipe(mapToModels());
  }

  public createRobot(data: RobotCreate): Observable<Robot> {
    return this.http
      .post<RobotDto>(this.url('/api/robots'), modelToDtoCreate(data))
      .pipe(mapToModel());
  }

  public getRobot(id: number): Observable<Robot> {
    return this.http
      .get<RobotDto>(this.url(`/api/robots/${id}`))
      .pipe(mapToModel());
  }

  public updateRobot(data: RobotUpdate): Observable<Robot> {
    const { id } = data;
    return this.http
      .put<RobotDto>(this.url(`/api/robots/${id}`), modelToDtoUpdate(data))
      .pipe(mapToModel());
  }

  public deleteRobot(id: number): Observable<void> {
    return this.http.delete<void>(this.url(`/api/robots/${id}`));
  }

  private url(path: string): string {
    return this.apiBaseUrl + path;
  }
}

interface RobotDto {
  readonly id: number;
  readonly name: string;
  readonly robot_type_id: number;
  readonly created_at: string;
  readonly updated_at: string;
}

type RobotCreateDto = Except<RobotDto, 'id' | 'created_at' | 'updated_at'>;

type RobotUpdateDto = Except<RobotDto, 'created_at' | 'updated_at'>;

function dtoToModel(dto: RobotDto): Robot {
  const { id, name, robot_type_id } = dto;

  return {
    id,
    name,
    robotType: robot_type_id,
  };
}

function modelToDtoCreate(model: RobotCreate): RobotCreateDto {
  const { name, robotType } = model;

  return {
    name,
    robot_type_id: robotType,
  };
}

function modelToDtoUpdate(model: RobotUpdate): RobotUpdateDto {
  const { id, name, robotType } = model;

  return {
    id,
    name,
    robot_type_id: robotType,
  };
}

const mapToModel = (): OperatorFunction<RobotDto, Robot> =>
  map((dto) => dtoToModel(dto));

const mapToModels = (): OperatorFunction<
  readonly RobotDto[],
  readonly Robot[]
> => map((dtos) => dtos.map((dto) => dtoToModel(dto)));
