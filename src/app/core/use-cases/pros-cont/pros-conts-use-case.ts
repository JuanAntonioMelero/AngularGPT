import { environment } from "../../../../environments/environment";
import { ProsContResponse } from "../../../interfaces";

export const prosContUseCase = async(prompt:string)=> {
  try{
    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser`,
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json '
      },
      body: JSON.stringify({prompt})
    });

    if  (!resp.ok) throw new Error('Mo se pudo realizar la comparacion');
    const data  =await resp.json() as ProsContResponse;
    return {
      ok:true,
      ...data,
    }
  }

  catch(error){
    console.log(error);
    //throw new Error('no se pudo realizar la conexion');
    return {
      ok:false,
      role:'',
      content:'No se pudo realizar la consulta'
    }
  }
}
