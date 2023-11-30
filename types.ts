export type Persona = {
    id:string;
    nombre: string;
}
export type Planeta = {
    id:string,
    nombre: string;
    personas: string[];
}
export type Dimension = {
    id:string,
    nombre: string;
    planetas: string[];
}
export type Tardis = {
    dimensiones: string[],
    camuflaje: string,
    generacion:number,
    epoca:number;
    id:string;
}