import mongoose from "npm:mongoose@7.6.3";
import { Tardis } from "../types.ts";

const Schema = mongoose.Schema;

const tardisSchema = new Schema(
    {
        dimensiones: { type: [Schema.Types.ObjectId], ref:'Dimension', required: true },
        camuflaje: { type: String, required: true },
        generacion:{ type: Number, required: true },
        epoca:{ type: Number, required: true }
    },
    { timestamps: true }
);

export type TardisModelType = mongoose.Document & Omit<Tardis, "id">;

export default mongoose.model<TardisModelType>("Tardis", tardisSchema);