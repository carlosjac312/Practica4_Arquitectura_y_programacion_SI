import { Request, Response } from "npm:express@4.18.2";
import PlanetaModel from "../db/planeta.ts";

const getallPlanets = async (req: Request, res: Response) => {
    try {
      const planeta = await PlanetaModel.find().populate({
        path: 'personas'
      })
      if(!planeta){
        res.status(400).send("No se encuentra");
        return;
      }
      res.status(200).send(planeta.map(i=>{return{
        nombre: i.nombre,
        id: i._id,
        persona: i.personas.map(e=>{return{
          nombre: e.nombre,
          id: e._id,
        }})
      }}))
    } catch (error) {
      res.status(404).send(error.message);
      return;
    }
  };
  
  export default getallPlanets;