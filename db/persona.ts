import mongoose from "npm:mongoose@7.6.3";
import { Persona } from "../types.ts";

const Schema = mongoose.Schema;

const personaSchema = new Schema(
    {
        nombre: { type: String, required: true },
    },
    { timestamps: true }
);

export type PersonaModelType = mongoose.Document & Omit<Persona, "id">;

export default mongoose.model<PersonaModelType>("Persona", personaSchema);