import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';
@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  constructor(
    public auth: AuthService,
    public modal: ModalService,
  ) {}
}
