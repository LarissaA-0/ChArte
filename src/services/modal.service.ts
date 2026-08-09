import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalOpen = new BehaviorSubject<string | null>(null);

  modalOpen$ = this.modalOpen.asObservable();

  openModal(modal: string) {
    this.modalOpen.next(modal);
  }

  closeModal() {
    this.modalOpen.next(null);
  }
}
