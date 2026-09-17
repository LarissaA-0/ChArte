import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../app/models/post';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalOpen = new BehaviorSubject<string | null>(null);
  modalOpen$ = this.modalOpen.asObservable();

  postSelecionado = new BehaviorSubject<Post | null>(null);
  postSelecionado$ = this.postSelecionado.asObservable();

  openModal(modal: string) {
    this.modalOpen.next(modal);
  }

  closeModal() {
    this.modalOpen.next(null);
  }
  selecionarPost(post: Post) {
    this.postSelecionado.next(post);
  }
}
