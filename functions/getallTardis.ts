import { Request, Response } from "npm:express@4.18.2";
import TardisModel from "../db/tardis.ts";

const getallTardis = async (req: Request, res: Response) => {
    try {
      const tardis = await TardisModel.find().populate({
        path: 'dimensiones',
        populate: {
          path: 'planetas',
          populate: {
            path: 'personas'
          }
        }
      });
      res.status(200).send(tardis.map(e=>{return{
        camuflaje: e.camuflaje,
        generacion: e.generacion,
        epoca: e.epoca,
        dimensiones: e.dimensiones.map(i=>{return{
          nombre: i.nombre,
          id: i._id,
          planetas: i.planetas.map(i=>{return{
            nombre: i.nombre,
            id: i._id,
            personas: i.personas.map(i=>{return{
              nombre: i.nombre,
              id: i._id,
            }})
          }})
        }}),
      }}))
    } catch (error) {
      res.status(404).send(error.message);
      return;
    }
  };
  
  export default getallTardis;