import { environment } from "../../../../environments/environment";
import type { OrtographyResponse } from '../../../interfaces/ortography.response';

export const ortographyUseCase = async (prompt:string)=>{
  try{
    const resp = await fetch(`${environment.backendApi}/orthography-check`,
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json '
      },
      body: JSON.stringify({prompt})
    });

    if  (!resp.ok) throw new Error('Mo se pudo realizar la conexion');
    const data  =await resp.json() as OrtographyResponse;
    return {
      ok:true,
      ...data,
    }
  }

  catch(error){
    console.log(error);
    return {
      ok:false,
      userScore:0,
      errors:[],
      message:'No se pudo realizar la consulta'
    }
  }
}
