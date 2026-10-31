export interface Solution {
  id: string;
  tag: string;
  name: string;
  description: string;
  valueProposition: string;
  features: string[];
}

export const solutions: Solution[] = [
  {
    id: "citasalud",
    tag: "Clínicas & Especialistas",
    name: "CitasSalud",
    description:
      "Solución ágil de gestión y reserva de citas para clínicas y especialistas, con recordatorios automáticos y agenda centralizada.",
    valueProposition:
      "Menos huecos en la agenda y menos llamadas: tus pacientes reservan online y tu equipo gestiona todo desde un único panel.",
    features: ["Agenda multi-especialista", "Recordatorios automáticos", "Reserva online 24/7"],
  },
  {
    id: "asesoria-ai-core",
    tag: "Contabilidad & Fiscalidad",
    name: "Asesoría AI Core",
    description:
      "Automatización integral contable y fiscal para asesorías y pymes, alineada con el Plan General Contable (PGC) y los modelos oficiales de la AEAT.",
    valueProposition:
      "Reduce horas de gestoría automatizando asientos, conciliaciones y la presentación de modelos fiscales con IA aplicada.",
    features: ["Automatización PGC", "Conciliación con IA", "Modelos AEAT"],
  },
  {
    id: "informes-periciales",
    tag: "Pericial & RRHH",
    name: "Informes periciales",
    description:
      "Sistema experto pericial para la evaluación del acoso laboral, validado científicamente con la Asociación Amaya, pensado para peritos, RRHH y departamentos legales.",
    valueProposition:
      "Informes periciales objetivos y trazables basados en metodología validada, reduciendo el riesgo legal en procesos de evaluación.",
    features: ["Metodología validada", "Soporte legal", "Trazabilidad del caso"],
  },
];
