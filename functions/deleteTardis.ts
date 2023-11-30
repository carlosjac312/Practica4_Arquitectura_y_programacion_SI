import { Request, Response } from "npm:express@4.18.2";
import TardisModel from "../db/tardis.ts";

const deleteTardis = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;//pide el dato
    const tardis = await TardisModel.findByIdAndDelete({ _id:id }).exec();//buscar y borrar pot id

    if (!tardis) {
      res.status(404).send("No se encontro la Tardis");
      return;
    }

    res.status(200).send("Tardis borrada");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteTardis;