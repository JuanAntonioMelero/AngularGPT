import { environment } from "../../../../environments/environment";
import { ProsContResponse } from "../../../interfaces";

export async function* prosContStreamUseCase(prompt:string, abortSignal:AbortSignal) {
  try{
    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`,
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json '
      },
      body: JSON.stringify({prompt}),
      signal:abortSignal
    });

    if  (!resp.ok) throw new Error('Mo se pudo realizar la comparacion');

    const reader = resp.body?.getReader();
    if (!reader){
      console.log('no tenemos reader');
      throw new Error('No se pudo generar el reader');
    }
    const decoder = new TextDecoder();
    let text='';
    while (true){
      const {value, done} = await reader.read();
      if (done){
        break;
      }
      const decodedChunk = decoder.decode(value, {stream:true});
      text += decodedChunk;
      yield text;

    }
    return text;
  }
  catch(error){
    return null;
  }
}
