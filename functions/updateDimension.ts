import { Request, Response } from "npm:express@4.18.2";
import DimensionModel from "../db/dimension.ts";

const updateDimension = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;//solicita id
    const { nombre } = req.body;
    if (!nombre) {//prevencion falta de datos
      res.status(400).send("Faltan datos");
      return;
    }
    const oldDimension = await DimensionModel.findById({ _id:id }).exec();
    const planetas = oldDimension?.planetas;
    const updatedDimension = await DimensionModel.findByIdAndUpdate(//busca por id y actualiza
      { _id:id },
      { nombre, planetas},
      { new: true }
    ).exec();

    if (!updatedDimension) {
      res.status(404).send("No se actualizo");
      return;
    }

    res.status(200).send({//muestra el disco actualizado
      nombre: updatedDimension.nombre,
      planetas_id: updatedDimension.planetas,
      id: updatedDimension._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateDimension;