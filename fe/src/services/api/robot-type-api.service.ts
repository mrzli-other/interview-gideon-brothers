import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RobotType, RobotTypeCreate, RobotTypeUpdate } from '../../types';
import { map, Observable, OperatorFunction } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import type { Except } from 'type-fest';

@Injectable({
  providedIn: 'root',
})
export class RobotTypeApiService {
  private readonly apiBaseUrl: string;

  public constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService,
  ) {
    this.apiBaseUrl = this.configService.configOptions.apiBaseUrl;
  }

  public getAllRobotTypes(): Observable<readonly RobotType[]> {
    return this.http
      .get<readonly RobotTypeDto[]>(this.url('/api/robot_types'))
      .pipe(mapToModels());
  }

  public createRobotType(data: RobotTypeCreate): Observable<RobotType> {
    return this.http
      .post<RobotTypeDto>(this.url('/api/robot_types'), modelToDtoCreate(data))
      .pipe(mapToModel());
  }

  public getRobotType(id: number): Observable<RobotType> {
    return this.http
      .get<RobotTypeDto>(this.url(`/api/robot_types/${id}`))
      .pipe(mapToModel());
  }

  public updateRobotType(data: RobotTypeUpdate): Observable<RobotType> {
    const { id } = data;
    return this.http
      .put<RobotTypeDto>(
        this.url(`/api/robot_types/${id}`),
        modelToDtoUpdate(data),
      )
      .pipe(mapToModel());
  }

  public deleteRobotType(id: number): Observable<void> {
    return this.http.delete<void>(this.url(`/api/robot_types/${id}`));
  }

  private url(path: string): string {
    return this.apiBaseUrl + path;
  }
}

interface RobotTypeDto {
  readonly id: number;
  readonly name: string;
  readonly dimensions: string;
  readonly created_at: string;
  readonly updated_at: string;
}

type RobotTypeCreateDto = Except<
  RobotTypeDto,
  'id' | 'created_at' | 'updated_at'
>;

type RobotTypeUpdateDto = Except<
  RobotTypeDto,
  'id' | 'created_at' | 'updated_at'
>;

function dtoToModel(dto: RobotTypeDto): RobotType {
  const { id, name, dimensions } = dto;

  return {
    id,
    name,
    dimensions,
  };
}

function modelToDtoCreate(model: RobotTypeCreate): RobotTypeCreateDto {
  const { name, dimensions } = model;

  return {
    name,
    dimensions,
  };
}

function modelToDtoUpdate(model: RobotTypeUpdate): RobotTypeUpdateDto {
  const { name, dimensions } = model;

  return {
    name,
    dimensions,
  };
}

const mapToModel = (): OperatorFunction<RobotTypeDto, RobotType> =>
  map((dto) => dtoToModel(dto));

const mapToModels = (): OperatorFunction<
  readonly RobotTypeDto[],
  readonly RobotType[]
> => map((dtos) => dtos.map((dto) => dtoToModel(dto)));
