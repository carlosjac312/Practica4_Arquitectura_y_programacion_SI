import { Request, Response } from "npm:express@4.18.2";
import DimensionModel from "../db/dimension.ts";

const getallDimensions = async (req: Request, res: Response) => {
    try {
      const dimension = await DimensionModel.find().populate({
        path: 'planetas',
        populate: {path: 'personas'}
      });
      res.status(200).send(dimension.map(i=>{return{
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
      }}));
    } catch (error) {
      res.status(404).send(error.message);
      return;
    }
  };
  
  export default getallDimensions;