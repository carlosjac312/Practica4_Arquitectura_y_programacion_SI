import { Request, Response } from "npm:express@4.18.2";
import PlanetaModel from "../db/planeta.ts";

const deletePlaneta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;//pide el dato
    const planeta = await PlanetaModel.findByIdAndDelete({ _id:id }).exec();//buscar y borrar pot id

    if (!planeta) {
      res.status(404).send("No se encontro el planeta");
      return;
    }

    res.status(200).send("Planeta borrado");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deletePlaneta;