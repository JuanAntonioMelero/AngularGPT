import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent,GptMessageOrtographyComponent,MyMessageComponent, TextMessageBoxComponent, TextMessageBoxEvent, TextMessageBoxFileComponent, TextMessageBoxSelectComponent, TextMessageEvent, TypingLoaderComponent} from '../../components';
import { Message } from '../../../interfaces';
import { OpenAiService } from '../../services/openai.service';

@Component({
  selector: 'app-ortography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    GptMessageOrtographyComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './ortographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrtographyPageComponent {

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

    this.OpenAiService.checkOrtography(prompt)
    .subscribe(resp=>{
      this.isLoading.set(false);
      this.messages.update( prev=>[
        ...prev,
        {
          isGpt:true,
          text:resp.message,
          info:resp,
        }
      ]);
    })
  }
  // handleMessageWithFile({prompt, file} : TextMessageEvent ){
  //   console.log({prompt,file})
  // }
  // handleMessageWithSelect(event:TextMessageBoxEvent){
  //   console.log(event)
  // }
}
