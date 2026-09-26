import { Component, Input } from '@angular/core';
import { Post } from '../../../models/post';
import { PerfilView } from '../../../models/perfil';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() post!: Post;
  @Input() perfil!: PerfilView;
}
