import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-assistan-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './assistanPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistanPageComponent { }
