import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent, MyMessageComponent, TextMessageBoxComponent, TypingLoaderComponent } from '../../components';
import { Message } from '../../../interfaces';
import { OpenAiService } from '../../../presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent

  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public OpenAiService = inject (OpenAiService);

  handleMessage(prompt:string ){
    this.isLoading.set(true);
    this.messages.update( (prev)=>[
      ...prev,
      {
        isGpt:false,
        text:prompt,
      }
    ]);
    this.OpenAiService.prosCont(prompt)
    .subscribe( resp=>{
      this.isLoading.set(false);
      this.messages.update( prev=>[
        ...prev,
        { isGpt:true,
          text: resp.content
        }

      ])
    })
  }
}
