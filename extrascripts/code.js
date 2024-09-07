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

// Procesos de tratamiento agrupados (ahora serán true o false)
const procesosTratamiento = {
  Turbidez: false,
  pH: false,
  ColiformesTotales: false,
  Conductividad: false,
  O2: false,
  MetalesPesados: {
    Plomo: false,
    Arsénico: false,
    Mercurio: false,
  },
  NitratosNitritos: false,
  PesticidasHerbicidasVOC: false,
  Radioactividad: {
    Uranio: false,
    Radio: false,
  },
  PM10PM2_5: false,
  ConcentracionGas: false,
};

// Función para asignar procesos de tratamiento
function asignarTratamientos(datos) {
  const tratamientos = JSON.parse(JSON.stringify(procesosTratamiento)); // Clonar el objeto

  for (const parametro in datos) {
    if (limites[parametro]) {
      if (
        typeof datos[parametro] === "object" &&
        !Array.isArray(datos[parametro])
      ) {
        // Validar y asignar tratamiento para metales pesados, radioactividad, etc.
        for (const subParametro in datos[parametro]) {
          if (
            datos[parametro][subParametro] >
            limites[parametro][subParametro].max
          ) {
            tratamientos[parametro][subParametro] = true;
          }
        }
      } else {
        // Validar y asignar tratamiento para parámetros simples
        if (
          datos[parametro] < limites[parametro].min ||
          datos[parametro] > limites[parametro].max
        ) {
          if (parametro === "Nitratos" || parametro === "Nitritos") {
            tratamientos["NitratosNitritos"] = true;
          } else if (
            parametro === "PesticidasHerbicidas" ||
            parametro === "VOC"
          ) {
            tratamientos["PesticidasHerbicidasVOC"] = true;
          } else if (parametro === "PM10" || parametro === "PM2_5") {
            tratamientos["PM10PM2_5"] = true;
          } else {
            tratamientos[parametro] = true;
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
