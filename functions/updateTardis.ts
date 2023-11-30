import { Request, Response } from "npm:express@4.18.2";
import TardisModel from "../db/tardis.ts";

const updateTardis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;//solicita id
    const { epoca, generacion, camuflaje } = req.body;
    if (!epoca || !generacion || !camuflaje) {//prevencion falta de datos
      res.status(400).send("Faltan datos");
      return;
    }
    const oldTardis = await TardisModel.findById({ _id:id }).exec();
    const dimensiones = oldTardis?.dimensiones;
    const updatedTardis = await TardisModel.findByIdAndUpdate(//busca por id y actualiza
      { _id:id },
      { epoca, generacion, camuflaje, dimensiones},
      { new: true }
    ).exec();

    if (!updatedTardis) {
      res.status(404).send("Disco no encontrado");
      return;
    }

    res.status(200).send({//muestra el disco actualizado
        epoca: updatedTardis.epoca,
        generacion: updatedTardis.generacion,
        camuflaje: updatedTardis.camuflaje,
        dimensiones_id: updatedTardis.dimensiones,
        id: updatedTardis._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateTardis;