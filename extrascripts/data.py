import random
import json


def generar_datos_random():
    datos = {
        "Turbidez": round(random.uniform(0.0, 100.0), 2),  # NTU
        "pH": round(random.uniform(6.0, 9.0), 2),  # Sin unidad
        # UFC/100ml
        "ColiformesTotales": round(random.uniform(0.0, 1000.0), 2),
        "E_coli": round(random.uniform(0.0, 1000.0), 2),  # UFC/100ml
        "Conductividad": round(random.uniform(0.0, 2000.0), 2),  # µS/cm
        "OxígenoDisuelto": round(random.uniform(0.0, 14.0), 2),  # mg/L
        "Plomo": round(random.uniform(0.0, 0.05), 4),  # mg/L
        "Arsénico": round(random.uniform(0.0, 0.05), 4),  # mg/L
        "Mercurio": round(random.uniform(0.0, 0.006), 4),  # mg/L
        "Nitratos": round(random.uniform(0.0, 50.0), 2),  # mg/L
        "Nitritos": round(random.uniform(0.0, 10.0), 2),  # mg/L
        "PesticidasHerbicidas": round(random.uniform(0.0, 0.5), 2),  # mg/L
        "VOC": round(random.uniform(0.0, 0.5), 2),  # mg/L
        "Uranio": round(random.uniform(0.0, 30.0), 2),  # pCi/L
        "Radio": round(random.uniform(0.0, 5.0), 2),  # pCi/L
        "Temperatura": round(random.uniform(0.0, 40.0), 2),  # °C
        "HumedadRelativa": round(random.uniform(0.0, 100.0), 2),  # %
        "PresiónAtmosférica": round(random.uniform(900.0, 1100.0), 2),  # hPa
        "PM10": round(random.uniform(0.0, 500.0), 2),  # µg/m³
        "PM2.5": round(random.uniform(0.0, 300.0), 2),  # µg/m³
        "IntensidadLumínica": round(random.uniform(0.0, 10000.0), 2),  # lux
        "ConcentraciónGas": round(random.uniform(0.0, 1000.0), 2)  # ppm
    }
    return datos


# Generar datos aleatorios
datos_random = generar_datos_random()

# Convertir a JSON
datos_json = json.dumps(datos_random, indent=4)
print(datos_json)
