import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebcommService {
  @Output() public OnMessage: EventEmitter<string> = new EventEmitter<any>();

  constructor() {}
}
