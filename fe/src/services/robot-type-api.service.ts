import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RobotType, RobotTypeCreate } from '../types';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

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

  public getAllRobotTypes(): Observable<RobotType[]> {
    return this.http.get<RobotType[]>(this.url('/api/robot_types'));
  }

  public createRobotType(data: RobotTypeCreate): Observable<RobotType> {
    return this.http.post<RobotType>(this.url('/api/robot_types'), data);
  }

  public getRobotType(id: number): Observable<RobotType> {
    return this.http.get<RobotType>(this.url(`/api/robot_types/${id}`));
  }

  public updateRobotType(data: RobotType): Observable<RobotType> {
    const { id } = data;
    return this.http.put<RobotType>(this.url(`/api/robot_types/${id}`), data);
  }

  public deleteRobotType(id: number): Observable<void> {
    return this.http.delete<void>(this.url(`/api/robot_types/${id}`));
  }

  private url(path: string): string {
    return this.apiBaseUrl + path;
  }
}
