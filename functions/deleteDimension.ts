import { Request, Response } from "npm:express@4.18.2";
import DimensionModel from "../db/dimension.ts";

const deleteDimension = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;//pide el dato
    const dimension = await DimensionModel.findByIdAndDelete({ _id:id }).exec();//buscar y borrar pot id

    if (!dimension) {
      res.status(404).send("No se encontro la dimension");
      return;
    }

    res.status(200).send("Dimension borrada");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteDimension;