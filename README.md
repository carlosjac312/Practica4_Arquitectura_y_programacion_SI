# Practica4_Arquitectura_y_programacion_SI
## Gets:

  /getTardis
  
  /getDimensiones
  
  /getPlanetas
  
  /getPersonas

## adds y updates:
  /addTardis || /updateTardis/:idTardis
  
    body:
    "epoca":"numero"
    "generacion":"numero"
    "camuflaje":"x"
  /addDimensiones || /updateDimension/:idDimesion
  
    body:
    "nombre":"nombrequequieras"
  /addPlanetas || /updatePlaneta/:idPlaneta
  
    body:
    "nombre":"nombrequequieras"
  /addPersonas || /updatePersona/:idPersona
  
    body:
    "nombre":"nombrequequieras"

## deletes:
  /deletePersona/:idPersona
  
  /deletePlaneta/:idPlaneta
  
  /deleteDimension/:idDimension
  
  /deleteTardis/:idTardis
