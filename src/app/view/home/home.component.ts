import { Component } from '@angular/core';

import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-home',
  imports: [ ListComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
