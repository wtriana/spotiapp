import { Component } from '@angular/core';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent  {

  faSync = faSync;
  constructor() { }
}
