import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  show() {
    this.isVisibleSubject.next(true);
  }

  hide() {
    this.isVisibleSubject.next(false);
  }

  toggle() {
    this.isVisibleSubject.next(!this.isVisibleSubject.getValue());
  }

  get isVisible() {
    return this.isVisibleSubject.getValue();
  }
}

