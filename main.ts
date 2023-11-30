import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";


const app = express();
app.use(express.json());

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts"; 

const env = await load(); 

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); 

if (!MONGO_URL) {
  console.log("No mongo URL found");
}


try {
    await mongoose.connect(MONGO_URL);
    console.log("Conexión exitosa a MongoDB");
} catch (error) {
    console.error("Error al conectar a MongoDB:", error);
}

import addTardis from "./functions/addTardis.ts";
import getallTardis from "./functions/getallTardis.ts";
import getallDimensions from "./functions/getDimension.ts";
import getallPlanets from "./functions/getPlaneta.ts";
import getallPersons from "./functions/getPersonas.ts";
import addDimesion from "./functions/addDimension.ts";
import addPlaneta from "./functions/addPlaneta.ts";
import addPersona from "./functions/addPersona.ts";
import deletePersona from "./functions/deletePersona.ts";
import deletePlaneta from "./functions/deletePlaneta.ts";
import deleteDimension from "./functions/deleteDimension.ts";
import deleteTardis from "./functions/deleteTardis.ts";
import updateTardis from "./functions/updateTardis.ts";
import updateDimension from "./functions/updateDimension.ts";
import updatePlaneta from "./functions/updatePlaneta.ts";
import updatePersona from "./functions/updatePersona.ts";

app
  .get("/getTardis", getallTardis)
  .get("/getDimensiones", getallDimensions)
  .get("/getPlanetas", getallPlanets)
  .get("/getPersonas", getallPersons)
  .post("/addTardis", addTardis)
  .post("/addDimension/:id", addDimesion)
  .post("/addPlaneta/:id", addPlaneta)
  .post("/addPersona/:id", addPersona)
  .delete("/deletePersona/:id", deletePersona)
  .delete("/deletePlaneta/:id", deletePlaneta)
  .delete("/deleteDimension/:id", deleteDimension)
  .delete("/deleteTardis/:id", deleteTardis)
  .put("/updateTardis/:id", updateTardis)
  .put("/updateDimension/:id", updateDimension)
  .put("/updatePlaneta/:id", updatePlaneta)
  .put("/updatePersona/:id", updatePersona)

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});