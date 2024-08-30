// Definir los límites para cada parámetro
const limites = {
  Turbidez: { min: 0.0, max: 5.0 },
  pH: { min: 6.5, max: 8.5 },
  ColiformesTotales: { min: 0, max: 0.0 }, // 0 es el límite máximo recomendado
  Conductividad: { min: 0.0, max: 500.0 },
  O2: { min: 5.0, max: 10.0 },
  MetalesPesados: {
    // Límites para metales pesados
    Plomo: { min: 0.0, max: 0.015 },
    Arsénico: { min: 0.0, max: 0.01 },
    Mercurio: { min: 0.0, max: 0.002 },
  },
  Nitratos: { min: 0.0, max: 10.0 },
  Nitritos: { min: 0.0, max: 1.0 },
  PesticidasHerbicidas: { min: 0.0, max: 0.1 },
  VOC: { min: 0.0, max: 0.1 },
  Radioactividad: {
    // Límites para radioactividad
    Uranio: { min: 0.0, max: 30.0 },
    Radio: { min: 0.0, max: 5.0 },
  },
  PM10: { min: 0.0, max: 150.0 },
  PM2_5: { min: 0.0, max: 35.0 },
  ConcentracionGas: { min: 0.0, max: 500.0 },
};

// Procesos de tratamiento agrupados
const procesosTratamiento = {
  //Sofia dice: Podemos simplificar todo esto
  //Es mas facil tratar aguas negras  por separado en donde realizamos un proceso donde eliminamos los males y no necesariamente un muestreo
  //Una entrada de aguas negras para desinfectarla
  //Santiago dice: Proceso de tratamiento: orinas, heces, aguas grises (agua jabonosa), este es un proceso de reciclaje/potabilizacion es mas sencillo que las aguas negras
  //Tenemos pensado en pasar aguas grieses a procesos purificados y aguas negras a un pretratamiento para unirlas con las aguas negras y hacer el purificacion y juntarlos
  //Un solo proceso paso a paso, solo de aguas grises y aguas negras
  //Si logramos eliminar las bacterias en las aguas negras, se puede mezclar con las aguas grises y hacer un solo tratamiento, luego tomar muestras y sacar conclusiones (si esta pura o necesita volver a pasar a purificar)

  Turbidez: "Filtración (arena, carbón activado, filtros de membrana)",
  pH: "Ajuste del pH mediante adición de ácidos o bases",
  ColiformesTotales: "Desinfección (cloración, ozonización, luz ultravioleta)", //Toma en cuenta todo quimico que entre
  //Santi dice: desifeccion por ultravioleta

  Conductividad: "Desionización o ablandamiento",
  O2: "Aireación",
  MetalesPesados:
    "Precipitación química, adsorción con carbón activado, filtración con resinas especiales",
  NitratosNitritos:
    "Desnitrificación biológica, filtración con resinas selectivas",
  PesticidasHerbicidasVOC: "Adsorción con carbón activado, oxidación avanzada",
  Radioactividad: "Intercambio iónico, filtración con resinas especiales",
  PM10PM2_5: "Filtración con filtros de partículas",
  ConcentracionGas: "Ventilación o adsorción en carbón activado",
  //TDS: "Desionización o ablandamiento", //Medir si llega un solido a este punto, puede detectar si entra algun solido en la muestra
  //Mencionar sobre temperatura por si llegase a afectar la muestra
};

// Función para asignar procesos de tratamiento
function asignarTratamientos(datos) {
  const tratamientos = {};

  for (const parametro in datos) {
    if (limites[parametro]) {
      if (Array.isArray(datos[parametro])) {
        // Validar y asignar tratamiento para metales pesados, radioactividad, etc.
        for (const subParametro in datos[parametro]) {
          if (
            datos[parametro][subParametro] >
            limites[parametro][subParametro].max
          ) {
            tratamientos[subParametro] =
              procesosTratamiento["MetalesPesados"] ||
              procesosTratamiento["Radioactividad"];
          }
        }
      } else {
        // Validar y asignar tratamiento para parámetros simples
        if (
          datos[parametro] < limites[parametro].min ||
          datos[parametro] > limites[parametro].max
        ) {
          if (parametro === "Nitratos" || parametro === "Nitritos") {
            tratamientos["NitratosNitritos"] =
              procesosTratamiento["NitratosNitritos"];
          } else if (
            parametro === "PesticidasHerbicidas" ||
            parametro === "VOC"
          ) {
            tratamientos["PesticidasHerbicidasVOC"] =
              procesosTratamiento["PesticidasHerbicidasVOC"];
          } else if (parametro === "PM10" || parametro === "PM2_5") {
            tratamientos["PM10PM2_5"] = procesosTratamiento["PM10PM2_5"];
          } else {
            tratamientos[parametro] = procesosTratamiento[parametro];
          }
        }
      }
    }
  }

  return tratamientos;
}

// Ejemplo de datos a validar y asignar tratamientos
const datosMuestra = {
  Turbidez: 92.9,
  pH: 8.38,
  ColiformesTotales: 776.67,
  Conductividad: 999.07,
  O2: 999.07,
  MetalesPesados: {
    Plomo: 0.045,
    Arsénico: 0.0462,
    Mercurio: 0.0048,
  },
  Nitratos: 21.55,
  Nitritos: 7.9,
  PesticidasHerbicidas: 0.03,
  VOC: 0.2,
  Radioactividad: {
    Uranio: 24.71,
    Radio: 2.32,
  },
  PM10: 36.02,
  PM2_5: 110.24,
  ConcentracionGas: 283,
};

// Asignar tratamientos
const tratamientosAsignados = asignarTratamientos(datosMuestra);
console.log(tratamientosAsignados);
