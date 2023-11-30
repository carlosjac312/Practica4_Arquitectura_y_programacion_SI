import { Request, Response } from "npm:express@4.18.2";
import DimensionModel from "../db/dimension.ts";
import TardisModel from "../db/tardis.ts";

const addDimesion = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const {id} = req.params;//Pedimos el id de la tardis en la que vamos a poner la dimension
    const tardis = await TardisModel.findById({ _id:id }).populate('dimensiones').exec();
    if (!nombre) {//prevencion falta de datos
      res.status(400).send("Faltan datos");
      return;
    }
    else if(!tardis){
      res.status(404).send("No se encontro la Tardis");
      return;
    }
    const planetas: string[]=[];
    const newDimension = new DimensionModel({ nombre, planetas });//creacion Tardis
    await newDimension.save();
    
    tardis.dimensiones.push(newDimension.id);
    await tardis.save();

    res.status(200).send({//envio del disco
      nombre: newDimension.nombre,
      planetas: newDimension.planetas,
      id: newDimension._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addDimesion;