import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";

const updatePersona = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;//solicita id
    const { nombre } = req.body;
    if (!nombre) {//prevencion falta de datos
      res.status(400).send("Faltan datos");
      return;
    }
    const updatedPersona = await PersonaModel.findByIdAndUpdate(//busca por id y actualiza
      { _id:id },
      { nombre },
      { new: true }
    ).exec();

    if (!updatedPersona) {
      res.status(404).send("No se actualizo");
      return;
    }

    res.status(200).send({//muestra el disco actualizado
      nombre: updatedPersona.nombre,
      id: updatedPersona._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updatePersona;