import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  constructor(
    public auth: AuthService,
    public modal: ModalService,
  ) {}
}

