import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Robot, RobotCreate } from '../../types';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/config.service';

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

  public getAllRobots(): Observable<Robot[]> {
    return this.http.get<Robot[]>(this.url('/api/robots'));
  }

  public createRobot(data: RobotCreate): Observable<Robot> {
    return this.http.post<Robot>(this.url('/api/robots'), data);
  }

  public getRobot(id: number): Observable<Robot> {
    return this.http.get<Robot>(this.url(`/api/robots/${id}`));
  }

  public updateRobot(data: Robot): Observable<Robot> {
    const { id } = data;
    return this.http.put<Robot>(this.url(`/api/robots/${id}`), data);
  }

  public deleteRobot(id: number): Observable<void> {
    return this.http.delete<void>(this.url(`/api/robots/${id}`));
  }

  private url(path: string): string {
    return this.apiBaseUrl + path;
  }
}
