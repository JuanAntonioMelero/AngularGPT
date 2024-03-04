import { Injectable } from '@angular/core';
import { audioToTextUseCase, imageGenerationUseCase, imageVariationUseCase, ortographyUseCase, prosContStreamUseCase, prosContUseCase, textToAudioUseCase, translateTextUseCase } from '../../core/use-cases';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
  checkOrtography(prompt:string ){
    return from (ortographyUseCase(prompt));
  }
  prosCont(prompt:string){
    return from (prosContUseCase(prompt));
  }
  prosConttream(prompt:string, abortSignal:AbortSignal){
    return  prosContStreamUseCase(prompt,abortSignal);
  }
  translateText(prompt: string, lang: string) {
    return from(translateTextUseCase(prompt, lang));
  }
  textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }
  audioToText( file: File, prompt?: string) {
    return from(audioToTextUseCase(file, prompt));
  }
  imageGeneration( prompt: string, originalImage?: string, maskImage?: string ) {
    return from( imageGenerationUseCase(prompt, originalImage, maskImage ) )
  }

  imageVariation( originalImage: string ) {
    return from( imageVariationUseCase( originalImage ) );
  }
}
