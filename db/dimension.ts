import mongoose from "npm:mongoose@7.6.3";
import { Dimension } from "../types.ts";

const Schema = mongoose.Schema;

const dimensionSchema = new Schema(
    {
        nombre: { type: String, required: true },
        planetas: {type: [Schema.Types.ObjectId], ref:'Planeta', required: true}
    },
    { timestamps: true }
);

export type DimensionModelType = mongoose.Document & Omit<Dimension, "id">;

export default mongoose.model<DimensionModelType>("Dimension", dimensionSchema);