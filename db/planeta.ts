import mongoose from "npm:mongoose@7.6.3";
import { Planeta } from "../types.ts";

const Schema = mongoose.Schema;

const planetaSchema = new Schema(
    {
        nombre: { type: String, required: true },
        personas: {type: [Schema.Types.ObjectId], ref:'Persona', required: true}
    },
    { timestamps: true }
);

export type PlanetaModelType = mongoose.Document & Omit<Planeta, "id">;

export default mongoose.model<PlanetaModelType>("Planeta", planetaSchema);