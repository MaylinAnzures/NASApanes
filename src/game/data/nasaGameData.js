/**
 * ROL 2 - MATRIZ DINÁMICA DE ESCENARIOS Y PROBABILIDADES (NASA SPACE APPS 2026)
 * Estructura extendida compatible con el motor de turnos diarios (Soles/Días).
 * Variables estrictas afectadas: electricidad (%), agua (L), comida (kg), salud (%), oxigeno (kg).
 */

export const NASA_GAME_SCENARIOS = {
    "metadata": {
        "project": "Junior Astronaut Mission Trainer - NASA Space Apps 2026",
        "architect": "Rol 2: Data Engineer & Integration",
        "totalScenariosGenerated": 12,
        "trackedMetrics": [
            "electricidad",
            "agua",
            "comida",
            "salud",
            "oxigeno"
        ],
        "integratedSources": [
            "NASA CCMC DONKI M2M_CATALOG (Live/Historical Extracted)",
            "NASA Open Science Data Repository - OSDR Bio Repo (Live Studies Extracted)",
            "NASA Life Support Baseline Values and Assumptions Document (BVAD)"
        ]
    },
    "scenarios": [
        {
            "scenarioId": "SCENARIO-M1-ECLIPSE-001",
            "missionId": "MISSION-1",
            "eventType": "NEGATIVE_TRADEOFF",
            "category": "Power & Thermal Management",
            "realWorldSource": "ISS Orbital Eclipse Telemetry & NASA BVAD Power Subsystems",
            "situationTitle": "¡Caída de Tensión en Sombra Orbital!",
            "kidFriendlyContext": "Cuando la cápsula pasa por la sombra de la Tierra, los paneles solares dejan de producir electricidad. Como las antenas y las luces del mini-huerto gastan mucha energía, las baterías se vacían rápido y la calefacción pierde fuerza.",
            "triggerConditions": {
                "dayRange": [2, 13],
                "requiredEquipment": ["IROSA_SOLAR", "VEGGIE_GARDEN"],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": [
                        { "metric": "electricidad", "operator": "<", "value": 35 }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.40,
                "baseAvoidChance": 0.60,
                "crewModifiers": []
            },
            "gameplayMechanics": {
                "resourcesAffected": ["electricidad", "comida", "salud"],
                "playerChoiceA": {
                    "action": "Apagar el Mini-Huerto Veggie durante 48 horas",
                    "sacrifice": "-2.5 kg de Comida",
                    "benefit": "+15% de Electricidad",
                    "effects": {
                        "electricidad": 15,
                        "agua": 0,
                        "comida": -2.5,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Ahorras batería suficiente para mantener la cabina caliente, pero pierdes parte de la cosecha fresca."
                },
                "playerChoiceB": {
                    "action": "Mantener el huerto encendido y apagar la calefacción",
                    "sacrifice": "-12% de Salud",
                    "benefit": "Conserva el 100% de la Comida",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": -12,
                        "oxigeno": 0
                    },
                    "result": "Las plantas sobreviven intactas, pero el frío dentro de la cápsula debilita a los astronautas."
                }
            },
            "educationalTakeaway": "En órbita baja o alta, las naves entran en eclipse varias veces al día y deben racionar sus baterías entre ciencia y temperatura."
        },
        {
            "scenarioId": "SCENARIO-M1-DONKI-FLR-002",
            "missionId": "MISSION-1",
            "eventType": "NEGATIVE_TRADEOFF",
            "category": "Space Weather & Shielding",
            "realWorldSource": "NASA CCMC DONKI (2026-10-09-FLR-001 - Clase X9.0)",
            "situationTitle": "¡Impacto de Llamarada Solar Clase X9.0!",
            "kidFriendlyContext": "El Sol lanza una nube de rayos invisibles muy potentes. Aunque las paredes de plástico especial (HDPE) detienen la mayor parte, un poco logra entrar y puede debilitar a los astronautas.",
            "triggerConditions": {
                "dayRange": [7, 12],
                "requiredEquipment": ["HDPE_SHIELDING"],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": []
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.60,
                "baseAvoidChance": 0.40,
                "crewModifiers": [
                    {
                        "astronautId": "ASTRO-05",
                        "role": "Físico de Radiación",
                        "triggerChanceDelta": -0.30,
                        "finalTriggerChance": 0.30,
                        "finalAvoidChance": 0.70
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": ["agua", "electricidad", "salud"],
                "playerChoiceA": {
                    "action": "Apilar bolsas de agua alrededor de la cabina y reforzar sensores",
                    "sacrifice": "-12 L de Agua y -15% de Electricidad",
                    "benefit": "Minimiza daño a solo -4% de Salud",
                    "effects": {
                        "electricidad": -15,
                        "agua": -12,
                        "comida": 0,
                        "salud": -4,
                        "oxigeno": 0
                    },
                    "result": "El agua absorbe la radiación como un escudo líquido y protege casi por completo a la tripulación."
                },
                "playerChoiceB": {
                    "action": "Conservar reservas intactas sin mover las bolsas de agua",
                    "sacrifice": "-18% de Salud",
                    "benefit": "Conserva 100% de Agua y Electricidad",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": -18,
                        "oxigeno": 0
                    },
                    "result": "No gastas agua ni batería, pero la radiación golpea directamente al equipo."
                }
            },
            "educationalTakeaway": "El agua es rica en hidrógeno y funciona como uno de los mejores escudos contra tormentas solares registradas por la red DONKI."
        },
        {
            "scenarioId": "SCENARIO-M1-HUMIDITY-003",
            "missionId": "MISSION-1",
            "eventType": "NEGATIVE_TRADEOFF",
            "category": "Atmosphere & Life Support (ECLSS)",
            "realWorldSource": "NASA BVAD LiOH Scrubber Humidity Limits & OSDR OSD-895",
            "situationTitle": "¡Filtros de Aire Empapados por Humedad!",
            "kidFriendlyContext": "Las plantas del mini-huerto sueltan vapor de agua al respirar. Como esta nave no tiene máquina para secar el aire, esa humedad moja los filtros químicos y vicia el aire de la cabina.",
            "triggerConditions": {
                "dayRange": [2, 10],
                "requiredEquipment": ["VEGGIE_GARDEN", "LIOH_FILTERS"],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": [
                        { "metric": "agua", "operator": ">", "value": 70 }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.35,
                "baseAvoidChance": 0.65,
                "crewModifiers": []
            },
            "gameplayMechanics": {
                "resourcesAffected": ["oxigeno", "comida", "salud"],
                "playerChoiceA": {
                    "action": "Purgar la cabina con aire seco de los tanques principales",
                    "sacrifice": "-4.5 kg de Oxígeno",
                    "benefit": "Salva al 100% la Salud y la Comida",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": -4.5
                    },
                    "result": "Renuevas el aire de inmediato; los astronautas respiran limpio y las plantas siguen creciendo."
                },
                "playerChoiceB": {
                    "action": "Cortar el riego del huerto y soportar aire húmedo 24 horas",
                    "sacrifice": "-2.0 kg de Comida y -8% de Salud",
                    "benefit": "Ahorra el 100% del Oxígeno",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": -2.0,
                        "salud": -8,
                        "oxigeno": 0
                    },
                    "result": "No gastas oxígeno de reserva, pero el aire pesado provoca dolor de cabeza y seca parte del cultivo."
                }
            },
            "educationalTakeaway": "En naves sin recicladores regenerativos, el exceso de humedad satura los cartuchos de hidróxido de litio (LiOH)."
        },
        {
            "scenarioId": "SCENARIO-M1-MICROMETEOROID-004",
            "missionId": "MISSION-1",
            "eventType": "NEGATIVE_TRADEOFF",
            "category": "Orbital Debris & EVA Operations",
            "realWorldSource": "NASA Orbital Debris Program & ISS iROSA Array Telemetry",
            "situationTitle": "¡Impacto de Micrometeorito en Panel Solar!",
            "kidFriendlyContext": "Una piedrita espacial que viaja súper rápido golpea una de las alas solares de la nave y hace un agujero. Ahora los paneles producen menos electricidad cada día.",
            "triggerConditions": {
                "dayRange": [3, 13],
                "requiredEquipment": ["IROSA_SOLAR", "ISS_EMU_SUITS"],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": []
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.45,
                "baseAvoidChance": 0.55,
                "crewModifiers": [
                    {
                        "astronautId": "ASTRO-12",
                        "role": "Especialista en Telecomunicaciones",
                        "triggerChanceDelta": -0.30,
                        "finalTriggerChance": 0.15,
                        "finalAvoidChance": 0.85
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": ["oxigeno", "salud", "electricidad"],
                "playerChoiceA": {
                    "action": "Salir con trajes espaciales a parchar el panel solar",
                    "sacrifice": "-3.0 kg de Oxígeno y -6% de Salud",
                    "benefit": "Recupera +20% de Electricidad",
                    "effects": {
                        "electricidad": 20,
                        "agua": 0,
                        "comida": 0,
                        "salud": -6,
                        "oxigeno": -3.0
                    },
                    "result": "La caminata espacial es agotadora y gasta aire de los trajes, pero el ala solar vuelve a funcionar al máximo."
                },
                "playerChoiceB": {
                    "action": "No salir al exterior y trabajar con el panel dañado",
                    "sacrifice": "-20% de Electricidad",
                    "benefit": "Conserva 100% de Oxígeno y Salud",
                    "effects": {
                        "electricidad": -20,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Evitas riesgos afuera de la nave, pero las baterías caen de golpe."
                }
            },
            "educationalTakeaway": "Los micrometeoritos orbitan a más de 28,000 km/h; los radares de telemetría permiten ajustar la órbita para esquivarlos."
        },
        {
            "scenarioId": "SCENARIO-M1-METABOLIC-005",
            "missionId": "MISSION-1",
            "eventType": "NEGATIVE_TRADEOFF",
            "category": "Crew Physiology & Rationing",
            "realWorldSource": "NASA OSDR Bio Repo (OSD-1010 & Crew Metabolic Baseline)",
            "situationTitle": "¡Descompensación en la Recta Final!",
            "kidFriendlyContext": "Falta muy poco para volver a la Tierra, pero queda poco aire en los tanques y poca comida. Los astronautas se cansan más rápido y respiran con mayor esfuerzo.",
            "triggerConditions": {
                "dayRange": [10, 13],
                "requiredEquipment": [],
                "resourceThresholds": {
                    "logic": "OR",
                    "conditions": [
                        { "metric": "oxigeno", "operator": "<", "value": 25 },
                        { "metric": "comida", "operator": "<", "value": 25 }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.50,
                "baseAvoidChance": 0.50,
                "crewModifiers": []
            },
            "gameplayMechanics": {
                "resourcesAffected": ["agua", "electricidad", "oxigeno", "comida", "salud"],
                "playerChoiceA": {
                    "action": "Forzar riego y luces LED del huerto para cosecha rápida",
                    "sacrifice": "-10 L de Agua y -18% de Electricidad",
                    "benefit": "+2.5 kg de Oxígeno y +2.0 kg de Comida",
                    "effects": {
                        "electricidad": -18,
                        "agua": -10,
                        "comida": 2.0,
                        "salud": 0,
                        "oxigeno": 2.5
                    },
                    "result": "Las plantas producen oxígeno y alimento de emergencia a cambio de gastar agua y batería."
                },
                "playerChoiceB": {
                    "action": "Aplicar racionamiento estricto y reposo absoluto",
                    "sacrifice": "-14% de Salud",
                    "benefit": "Recupera +1.5 kg de Oxígeno y +1.5 kg de Comida",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 1.5,
                        "salud": -14,
                        "oxigeno": 1.5
                    },
                    "result": "Al quedarse quietos y comer menos, estiran las reservas finales pero llegan debilitados."
                }
            },
            "educationalTakeaway": "El cuerpo humano consume más oxígeno y calorías cuando trabaja bajo estrés en microgravedad."
        },
        {
            "scenarioId": "SCENARIO-M1-RESCUE-ORBIT-006",
            "missionId": "MISSION-1",
            "eventType": "POSITIVE_RESCUE",
            "category": "Ground Control Optimization",
            "realWorldSource": "NASA Deep Space Network & Orbital Telemetry Optimization",
            "situationTitle": "¡Ventana Orbital Despejada y Apoyo de Tierra!",
            "kidFriendlyContext": "¡Buenas noticias! La cápsula cruza una zona con luz solar directa sin eclipses largos y Control de Tierra envía una señal para recuperar reservas atrapadas en los conductos. Elige qué recurso bajo quieres rescatar:",
            "triggerConditions": {
                "dayRange": [3, 13],
                "requiredEquipment": [],
                "resourceThresholds": {
                    "logic": "OR",
                    "conditions": [
                        { "metric": "electricidad", "operator": "<", "value": 30 },
                        { "metric": "agua", "operator": "<", "value": 30 },
                        { "metric": "oxigeno", "operator": "<", "value": 30 }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.35,
                "baseAvoidChance": 0.65,
                "crewModifiers": []
            },
            "gameplayMechanics": {
                "resourcesAffected": ["electricidad", "agua", "oxigeno"],
                "playerChoiceA": {
                    "action": "Carga rápida de baterías solares",
                    "sacrifice": "Ninguno",
                    "benefit": "+25% de Electricidad",
                    "effects": {
                        "electricidad": 25,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Las baterías reciben una recarga completa gracias al ángulo perfecto con el Sol."
                },
                "playerChoiceB": {
                    "action": "Purga de agua condensada en tuberías",
                    "sacrifice": "Ninguno",
                    "benefit": "+18 L de Agua",
                    "effects": {
                        "electricidad": 0,
                        "agua": 18,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Recuperas agua limpia atrapada en los sistemas de enfriamiento."
                },
                "playerChoiceC": {
                    "action": "Liberar reserva de seguridad de tanques auxiliares",
                    "sacrifice": "Ninguno",
                    "benefit": "+5.0 kg de Oxígeno",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 5.0
                    },
                    "result": "Los tanques secundarios transfieren aire fresco directo a la cabina."
                }
            },
            "educationalTakeaway": "Los ingenieros en la Tierra monitorean cada válvula de la nave para exprimir hasta la última gota de agua o voltio disponible."
        },
        {
            "scenarioId": "SCENARIO-M1-RESCUE-VEGGIE-007",
            "missionId": "MISSION-1",
            "eventType": "POSITIVE_RESCUE",
            "category": "Space Agriculture & Nutrition",
            "realWorldSource": "NASA OSDR Bio Repo (OSD-895: EDEN ISS Biomass Production)",
            "situationTitle": "¡Brote Acelerado en el Mini-Huerto Veggie!",
            "kidFriendlyContext": "La temperatura y luz rosa del mini-huerto lograron un crecimiento súper rápido en las plantas. El Astrobiólogo puede aprovechar este brote para ayudar al equipo. Elige qué recurso recuperar:",
            "triggerConditions": {
                "dayRange": [4, 13],
                "requiredEquipment": ["VEGGIE_GARDEN"],
                "resourceThresholds": {
                    "logic": "OR",
                    "conditions": [
                        { "metric": "comida", "operator": "<", "value": 30 },
                        { "metric": "salud", "operator": "<", "value": 30 }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.30,
                "baseAvoidChance": 0.70,
                "crewModifiers": []
            },
            "gameplayMechanics": {
                "resourcesAffected": ["comida", "salud", "oxigeno"],
                "playerChoiceA": {
                    "action": "Cosecha extra de vegetales frescos",
                    "sacrifice": "Ninguno",
                    "benefit": "+3.5 kg de Comida",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 3.5,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Llenas la despensa con hojas frescas ricas en nutrientes."
                },
                "playerChoiceB": {
                    "action": "Preparar suplemento vitamínico revitalizante",
                    "sacrifice": "Ninguno",
                    "benefit": "+18% de Salud",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": 18,
                        "oxigeno": 0
                    },
                    "result": "Las vitaminas frescas recuperan la fuerza física de toda la tripulación."
                },
                "playerChoiceC": {
                    "action": "Maximizar fotosíntesis para purificar cabina",
                    "sacrifice": "Ninguno",
                    "benefit": "+3.5 kg de Oxígeno",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 3.5
                    },
                    "result": "Las plantas absorben dióxido de carbono y liberan oxígeno puro."
                }
            },
            "educationalTakeaway": "Cultivar plantas en el espacio no solo da comida fresca: también ayuda a producir oxígeno y mejorar la salud."
        },
        {
            "scenarioId": "SCENARIO-M2-LUNAR-NIGHT-008",
            "missionId": "MISSION-2",
            "eventType": "NEGATIVE_TRADEOFF",
            "category": "ISRU & Nuclear Power Load",
            "realWorldSource": "NASA Artemis Shackleton Crater & Kilopower Thermal Telemetry",
            "situationTitle": "¡Sobrecarga durante la Noche Polar Lunar!",
            "kidFriendlyContext": "En medio de los 14 días de oscuridad total en la Luna, el frío extremo exige más calefacción justo cuando el robot minero derrite hielo subterráneo.",
            "triggerConditions": {
                "dayRange": [15, 30],
                "requiredEquipment": ["KILOPOWER_REACTOR", "ISRU_WATER_MINER"],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": [
                        { "metric": "agua", "operator": "<", "value": 40 }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.45,
                "baseAvoidChance": 0.55,
                "crewModifiers": [
                    {
                        "astronautId": "ASTRO-01",
                        "role": "Ingeniero Eléctrico",
                        "triggerChanceDelta": -0.30,
                        "finalTriggerChance": 0.15,
                        "finalAvoidChance": 0.85
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": ["electricidad", "agua", "salud"],
                "playerChoiceA": {
                    "action": "Forzar el reactor Kilopower para seguir extrayendo hielo",
                    "sacrifice": "-22% de Electricidad",
                    "benefit": "+25 L de Agua",
                    "effects": {
                        "electricidad": -22,
                        "agua": 25,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Consigues derretir hielo suficiente para los tanques, pero la reserva eléctrica queda baja."
                },
                "playerChoiceB": {
                    "action": "Pausar la excavadora de hielo y priorizar calefacción",
                    "sacrifice": "-15 L de Agua y -6% de Salud",
                    "benefit": "Mantiene estable el 100% de la Electricidad",
                    "effects": {
                        "electricidad": 0,
                        "agua": -15,
                        "comida": 0,
                        "salud": -6,
                        "oxigeno": 0
                    },
                    "result": "La red eléctrica no sufre daños, pero gastas agua de emergencia mientras el hielo vuelve a congelarse."
                }
            },
            "educationalTakeaway": "La noche lunar dura casi 15 días terrestres y alcanza -180 °C, por lo que la energía nuclear es vital para extraer agua."
        },
        {
            "scenarioId": "SCENARIO-M2-REGOLITH-DUST-009",
            "missionId": "MISSION-2",
            "eventType": "NEGATIVE_TRADEOFF",
            "category": "Planetary Surface & EVA",
            "realWorldSource": "NASA Lunar Regolith Abrasion & xEMU Suit Diagnostics",
            "situationTitle": "¡Polvo Lunar Afilado en las Juntas de los Trajes!",
            "kidFriendlyContext": "Al regresar de explorar en el vehículo abierto, el polvo de la Luna —que es afilado como vidrio molido— se mete en los sellos de los trajes espaciales.",
            "triggerConditions": {
                "dayRange": [5, 42],
                "requiredEquipment": ["XEMU_SUITS", "LTV_ROVER"],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": []
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.50,
                "baseAvoidChance": 0.50,
                "crewModifiers": [
                    {
                        "astronautId": "ASTRO-06",
                        "role": "Piloto de Rover y EVA",
                        "triggerChanceDelta": -0.25,
                        "finalTriggerChance": 0.25,
                        "finalAvoidChance": 0.75
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": ["oxigeno", "salud", "agua"],
                "playerChoiceA": {
                    "action": "Presurizar la esclusa para expulsar polvo y reparar sellos",
                    "sacrifice": "-4.0 kg de Oxígeno y -8% de Salud",
                    "benefit": "Ahorra el 100% del Agua",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": -8,
                        "oxigeno": -4.0
                    },
                    "result": "Limpian los trajes con aire a presión y trabajo duro sin gastar ni una gota de agua."
                },
                "playerChoiceB": {
                    "action": "Lavar los trajes con agua a presión en la cámara",
                    "sacrifice": "-18 L de Agua",
                    "benefit": "Conserva 100% de Oxígeno y Salud",
                    "effects": {
                        "electricidad": 0,
                        "agua": -18,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "El agua arrastra el polvo magnético sin esfuerzo físico ni pérdida de oxígeno."
                }
            },
            "educationalTakeaway": "El polvo lunar no tiene viento ni agua que lo redondee, por eso sus granos son microscópicos y muy abrasivos."
        },
        {
            "scenarioId": "SCENARIO-M3-THERMAL-LEAK-010",
            "missionId": "MISSION-3",
            "eventType": "NEGATIVE_TRADEOFF",
            "category": "Station Structural & Thermal Control",
            "realWorldSource": "NASA Lunar Gateway Thermal Control Loop Telemetry",
            "situationTitle": "¡Fuga en el Circuito Térmico de Gateway!",
            "kidFriendlyContext": "Con 6 astronautas a bordo, una tubería externa de la estación pierde líquido refrigerante y el frío del espacio empieza a congelar los pasillos.",
            "triggerConditions": {
                "dayRange": [4, 19],
                "requiredEquipment": ["KILOPOWER_REACTOR", "IROSA_SOLAR"],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": [
                        { "metric": "electricidad", "operator": "<", "value": 45 }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.55,
                "baseAvoidChance": 0.45,
                "crewModifiers": [
                    {
                        "astronautId": "ASTRO-09",
                        "role": "Ingeniero Mecánico",
                        "triggerChanceDelta": -0.35,
                        "finalTriggerChance": 0.20,
                        "finalAvoidChance": 0.80
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": ["electricidad", "salud", "oxigeno"],
                "playerChoiceA": {
                    "action": "Encender calentadores eléctricos auxiliares al máximo",
                    "sacrifice": "-25% de Electricidad y -3% de Salud",
                    "benefit": "Conserva el 100% del Oxígeno",
                    "effects": {
                        "electricidad": -25,
                        "agua": 0,
                        "comida": 0,
                        "salud": -3,
                        "oxigeno": 0
                    },
                    "result": "Estabilizas la temperatura rápido usando casi toda la reserva de batería."
                },
                "playerChoiceB": {
                    "action": "Cerrar escotillas y sellar la fuga desde el exterior",
                    "sacrifice": "-16% de Salud y -3.5 kg de Oxígeno",
                    "benefit": "Conserva el 100% de la Electricidad",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": -16,
                        "oxigeno": -3.5
                    },
                    "result": "Reparas el tubo sin gastar batería, pero el frío y la salida exterior desgastan a los 6 tripulantes."
                }
            },
            "educationalTakeaway": "En el vacío espacial no hay aire que conduzca el calor; las estaciones dependen de circuitos cerrados de refrigeración."
        },
        {
            "scenarioId": "SCENARIO-M4-BIOFILM-WRS-011",
            "missionId": "MISSION-4",
            "eventType": "NEGATIVE_TRADEOFF",
            "category": "Water Processor & Closed-Loop ECLSS",
            "realWorldSource": "NASA OSDR Bio Repo (OSD-729: Biofilm formation in ISS Water Processor)",
            "situationTitle": "¡Obstrucción por Biopelícula en Recicladora WRS!",
            "kidFriendlyContext": "En microgravedad y baja gravedad marciana, bacterias inofensivas forman una capa pegajosa dentro de los tubos de la máquina recicladora de agua y bloquean el filtro.",
            "triggerConditions": {
                "dayRange": [25, 165],
                "requiredEquipment": ["WRS_RECYCLER"],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": [
                        { "metric": "agua", "operator": "<", "value": 35 }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.45,
                "baseAvoidChance": 0.55,
                "crewModifiers": [
                    {
                        "astronautId": "ASTRO-02",
                        "role": "Ingeniero Hidráulico",
                        "triggerChanceDelta": -0.30,
                        "finalTriggerChance": 0.15,
                        "finalAvoidChance": 0.85
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": ["electricidad", "oxigeno", "agua", "salud"],
                "playerChoiceA": {
                    "action": "Esterilizar tuberías con choque térmico y ozono",
                    "sacrifice": "-20% de Electricidad y -2.0 kg de Oxígeno",
                    "benefit": "Recupera el reciclaje al 98% sin perder Agua",
                    "effects": {
                        "electricidad": -20,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": -2.0
                    },
                    "result": "Limpias los conductos internos y mantienes intacta tu reserva de agua potable."
                },
                "playerChoiceB": {
                    "action": "Desarmar el filtro manualmente y usar reserva líquida",
                    "sacrifice": "-28 L de Agua y -7% de Salud",
                    "benefit": "Conserva 100% de Electricidad y Oxígeno",
                    "effects": {
                        "electricidad": 0,
                        "agua": -28,
                        "comida": 0,
                        "salud": -7,
                        "oxigeno": 0
                    },
                    "result": "Pierdes agua sin reciclar durante dos días mientras limpian los conductos a mano."
                }
            },
            "educationalTakeaway": "El estudio OSD-729 de la NASA analiza cómo evitar que las biopelículas bloqueen los recicladores de agua en viajes largos."
        },
        {
            "scenarioId": "SCENARIO-M4-DUST-STORM-012",
            "missionId": "MISSION-4",
            "eventType": "NEGATIVE_TRADEOFF",
            "category": "Martian Weather & Closed-Loop Agriculture",
            "realWorldSource": "NASA InSight Mars Weather & OSDR OSD-971 Plant Stress",
            "situationTitle": "¡Tormenta Global de Polvo en el Cráter Jezero!",
            "kidFriendlyContext": "Una tormenta gigante cubre el cielo de Marte durante semanas. Los paneles solares de respaldo dejan de funcionar y el sistema cerrado debe elegir entre alimentar la granja o ahorrar energía.",
            "triggerConditions": {
                "dayRange": [90, 115],
                "requiredEquipment": ["APH_GREENHOUSE", "SABATIER_SYSTEM"],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": []
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.60,
                "baseAvoidChance": 0.40,
                "crewModifiers": [
                    {
                        "astronautId": "ASTRO-03",
                        "role": "Agrónomo Espacial",
                        "triggerChanceDelta": -0.25,
                        "finalTriggerChance": 0.35,
                        "finalAvoidChance": 0.65
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": ["electricidad", "agua", "comida", "salud"],
                "playerChoiceA": {
                    "action": "Redirigir energía del reactor nuclear a la Granja APH",
                    "sacrifice": "-18% de Electricidad y -15 L de Agua",
                    "benefit": "+4.5 kg de Comida",
                    "effects": {
                        "electricidad": -18,
                        "agua": -15,
                        "comida": 4.5,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Las lámparas de la granja siguen brillando en plena oscuridad marciana y aseguran comida fresca."
                },
                "playerChoiceB": {
                    "action": "Poner la granja en hibernación y racionar comida",
                    "sacrifice": "-6.5 kg de Comida y -10% de Salud",
                    "benefit": "Conserva 100% de Electricidad y Agua",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": -6.5,
                        "salud": -10,
                        "oxigeno": 0
                    },
                    "result": "Ahorras energía y agua durante la tormenta, pero pierdes cosecha y los astronautas pasan hambre."
                }
            },
            "educationalTakeaway": "Las tormentas de polvo en Marte pueden durar meses y bloquear hasta el 99% de la luz solar."
        }
    ]
};