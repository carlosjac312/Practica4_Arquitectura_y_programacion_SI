import { Request, Response } from "npm:express@4.18.2";
import TardisModel from "../db/tardis.ts";
import dimension from "../db/dimension.ts";

const addTardis = async (req: Request, res: Response) => {
  try {
    const { epoca, generacion, camuflaje, } = req.body;
    if (!epoca || !generacion || !camuflaje) {//prevencion falta de datos
      res.status(400).send("Faltan datos");
      return;
    }


    const dimensiones : string[]=[];
    const newTardis = new TardisModel({ epoca, generacion, camuflaje, dimensiones });//creacion Tardis
    await newTardis.save();
    
    res.status(200).send({
      epoca: newTardis.epoca,
      generacion: newTardis.generacion,
      camuflaje: newTardis.camuflaje,
      dimensiones: newTardis.dimensiones,
      id: newTardis._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addTardis;