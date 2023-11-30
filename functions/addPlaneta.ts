import { Request, Response } from "npm:express@4.18.2";
import PlanetaModel from "../db/planeta.ts";
import DimensionModel from "../db/dimension.ts";

const addPlaneta = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const {id} = req.params;//Pedimos el id de la tardis en la que vamos a poner la dimension
    const dimension = await DimensionModel.findById({ _id:id }).populate('planetas').exec();
    if (!nombre) {//prevencion falta de datos
      res.status(400).send("Faltan datos");
      return;
    }
    else if(!dimension){
      res.status(404).send("No se encontro la dimension");
      return;
    }
    const personas: string[]=[];
    const newPlaneta = new PlanetaModel({ nombre, personas });//creacion Planeta
    await newPlaneta.save();
    
    dimension.planetas.push(newPlaneta.id);
    await dimension.save();

    res.status(200).send({//envio del disco
      nombre: newPlaneta.nombre,
      personas: newPlaneta.personas,
      id: newPlaneta._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addPlaneta;