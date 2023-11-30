import { Request, Response } from "npm:express@4.18.2";
import PlanetaModel from "../db/planeta.ts";

const updatePlaneta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;//solicita id
    const { nombre } = req.body;
    if (!nombre) {//prevencion falta de datos
      res.status(400).send("Faltan datos");
      return;
    }
    const oldPlaneta = await PlanetaModel.findById({ _id:id }).exec();
    const personas = oldPlaneta?.personas;
    const updatedPlaneta = await PlanetaModel.findByIdAndUpdate(//busca por id y actualiza
      { _id:id },
      { nombre, personas},
      { new: true }
    ).exec();

    if (!updatedPlaneta) {
      res.status(404).send("No se actualizo");
      return;
    }

    res.status(200).send({//muestra el disco actualizado
      nombre: updatedPlaneta.nombre,
      personas_id: updatedPlaneta.personas,
      id: updatedPlaneta._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updatePlaneta;