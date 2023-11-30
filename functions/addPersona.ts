import { Request, Response } from "npm:express@4.18.2";
import PersonaModel from "../db/persona.ts";
import PlanetaModel from "../db/planeta.ts";

const addPersona = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.body;
    const {id} = req.params;//Pedimos el id de la tardis en la que vamos a poner la dimension
    const planeta = await PlanetaModel.findById({ _id:id }).populate('personas').exec();
    if (!nombre) {//prevencion falta de datos
      res.status(400).send("Faltan datos");
      return;
    }
    else if(!planeta){
      res.status(404).send("No se encontro el planeta");
      return;
    }
    const newPersona = new PersonaModel({ nombre });//creacion persona
    await newPersona.save();
    
    planeta.personas.push(newPersona.id);
    await planeta.save();

    res.status(200).send({//envio del disco
      nombre: newPersona.nombre,
      id: newPersona._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addPersona;