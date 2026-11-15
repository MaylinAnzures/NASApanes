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
            "situationTitle": "¡Se hizo de noche en la nave!",
            "kidFriendlyContext": "La nave pasó por la sombra de la Tierra y los paneles solares ya no reciben luz. Las baterías se están vaciando y empieza a hacer frío adentro.",
            "triggerConditions": {
                "dayRange": [
                    2,
                    13
                ],
                "requiredEquipment": [
                    "IROSA_SOLAR",
                    "VEGGIE_GARDEN"
                ],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": [
                        {
                            "metric": "electricidad",
                            "operator": "<",
                            "value": 35
                        }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.4,
                "baseAvoidChance": 0.6,
                "crewModifiers": []
            },
            "gameplayMechanics": {
                "resourcesAffected": [
                    "electricidad",
                    "comida",
                    "salud"
                ],
                "playerChoiceA": {
                    "action": "Apagar el huerto por 2 días",
                    "sacrifice": "Pierdes 2.5 kg de comida",
                    "benefit": "Ganas 15% de energía",
                    "effects": {
                        "electricidad": 15,
                        "agua": 0,
                        "comida": -2.5,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Ahorras energía y la cabina sigue calientita, pero se pierde parte de la cosecha."
                },
                "playerChoiceB": {
                    "action": "Dejar el huerto prendido y apagar la calefacción",
                    "sacrifice": "Pierdes 12% de salud",
                    "benefit": "No pierdes comida",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": -12,
                        "oxigeno": 0
                    },
                    "result": "Las plantas se salvan, pero el frío cansa a los astronautas."
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
            "situationTitle": "¡Llegó una tormenta del Sol!",
            "kidFriendlyContext": "El Sol lanzó una ola de rayos invisibles que pueden enfermar a los astronautas. Las paredes de la nave los frenan, pero algunos todavía pasan.",
            "triggerConditions": {
                "dayRange": [
                    7,
                    12
                ],
                "requiredEquipment": [
                    "HDPE_SHIELDING"
                ],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": []
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.6,
                "baseAvoidChance": 0.4,
                "crewModifiers": [
                    {
                        "astronautId": "ASTRO-05",
                        "role": "Físico de Radiación",
                        "triggerChanceDelta": -0.3,
                        "finalTriggerChance": 0.3,
                        "finalAvoidChance": 0.7
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": [
                    "agua",
                    "electricidad",
                    "salud"
                ],
                "playerChoiceA": {
                    "action": "Poner bolsas de agua alrededor de la cabina",
                    "sacrifice": "Pierdes 12 L de agua y 15% de energía",
                    "benefit": "Solo pierdes 4% de salud",
                    "effects": {
                        "electricidad": -15,
                        "agua": -12,
                        "comida": 0,
                        "salud": -4,
                        "oxigeno": 0
                    },
                    "result": "El agua funciona como un escudo y casi protege a todos."
                },
                "playerChoiceB": {
                    "action": "No gastar agua ni energía",
                    "sacrifice": "Pierdes 18% de salud",
                    "benefit": "Guardas toda tu agua y energía",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": -18,
                        "oxigeno": 0
                    },
                    "result": "Ahorras recursos, pero los rayos golpean al equipo de lleno."
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
            "situationTitle": "¡El aire de la nave está muy húmedo!",
            "kidFriendlyContext": "Las plantas del huerto sueltan mucha agua en el aire. La humedad moja los filtros y el aire se siente pesado.",
            "triggerConditions": {
                "dayRange": [
                    2,
                    10
                ],
                "requiredEquipment": [
                    "VEGGIE_GARDEN",
                    "LIOH_FILTERS"
                ],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": [
                        {
                            "metric": "agua",
                            "operator": ">",
                            "value": 70
                        }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.35,
                "baseAvoidChance": 0.65,
                "crewModifiers": []
            },
            "gameplayMechanics": {
                "resourcesAffected": [
                    "oxigeno",
                    "comida",
                    "salud"
                ],
                "playerChoiceA": {
                    "action": "Cambiar el aire con aire seco de los tanques",
                    "sacrifice": "Pierdes 4.5 kg de oxígeno",
                    "benefit": "No pierdes salud ni comida",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": -4.5
                    },
                    "result": "El aire queda limpio y las plantas siguen creciendo."
                },
                "playerChoiceB": {
                    "action": "Dejar de regar y aguantar un día",
                    "sacrifice": "Pierdes 2 kg de comida y 8% de salud",
                    "benefit": "No gastas oxígeno",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": -2,
                        "salud": -8,
                        "oxigeno": 0
                    },
                    "result": "Ahorras aire, pero a todos les duele la cabeza y se seca parte del huerto."
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
            "situationTitle": "¡Una piedra espacial chocó con la nave!",
            "kidFriendlyContext": "Una piedrita que viaja a toda velocidad hizo un agujero en un panel solar. Ahora la nave produce menos energía.",
            "triggerConditions": {
                "dayRange": [
                    3,
                    13
                ],
                "requiredEquipment": [
                    "IROSA_SOLAR",
                    "ISS_EMU_SUITS"
                ],
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
                        "triggerChanceDelta": -0.3,
                        "finalTriggerChance": 0.15,
                        "finalAvoidChance": 0.85
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": [
                    "oxigeno",
                    "salud",
                    "electricidad"
                ],
                "playerChoiceA": {
                    "action": "Salir con trajes espaciales a arreglar el panel",
                    "sacrifice": "Pierdes 3 kg de oxígeno y 6% de salud",
                    "benefit": "Ganas 20% de energía",
                    "effects": {
                        "electricidad": 20,
                        "agua": 0,
                        "comida": 0,
                        "salud": -6,
                        "oxigeno": -3
                    },
                    "result": "Salir cansa mucho, pero el panel vuelve a funcionar."
                },
                "playerChoiceB": {
                    "action": "Quedarse adentro con el panel roto",
                    "sacrifice": "Pierdes 20% de energía",
                    "benefit": "No pierdes oxígeno ni salud",
                    "effects": {
                        "electricidad": -20,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Nadie corre peligro afuera, pero las baterías bajan de golpe."
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
            "situationTitle": "¡Ya casi llegamos, pero falta aire y comida!",
            "kidFriendlyContext": "Falta poco para volver a casa, pero quedan pocas reservas de aire y de comida. Los astronautas se cansan más rápido.",
            "triggerConditions": {
                "dayRange": [
                    10,
                    13
                ],
                "requiredEquipment": [],
                "resourceThresholds": {
                    "logic": "OR",
                    "conditions": [
                        {
                            "metric": "oxigeno",
                            "operator": "<",
                            "value": 25
                        },
                        {
                            "metric": "comida",
                            "operator": "<",
                            "value": 25
                        }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.5,
                "baseAvoidChance": 0.5,
                "crewModifiers": []
            },
            "gameplayMechanics": {
                "resourcesAffected": [
                    "agua",
                    "electricidad",
                    "oxigeno",
                    "comida",
                    "salud"
                ],
                "playerChoiceA": {
                    "action": "Regar y prender las luces del huerto a toda potencia",
                    "sacrifice": "Pierdes 10 L de agua y 18% de energía",
                    "benefit": "Ganas 2.5 kg de oxígeno y 2 kg de comida",
                    "effects": {
                        "electricidad": -18,
                        "agua": -10,
                        "comida": 2,
                        "salud": 0,
                        "oxigeno": 2.5
                    },
                    "result": "Las plantas dan aire y comida extra a cambio de agua y energía."
                },
                "playerChoiceB": {
                    "action": "Comer menos y descansar mucho",
                    "sacrifice": "Pierdes 14% de salud",
                    "benefit": "Ganas 1.5 kg de oxígeno y 1.5 kg de comida",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 1.5,
                        "salud": -14,
                        "oxigeno": 1.5
                    },
                    "result": "Las reservas rinden más, pero todos llegan muy cansados."
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
            "situationTitle": "¡Buenas noticias desde la Tierra!",
            "kidFriendlyContext": "La nave recibe mucha luz del Sol y Control de Misión te manda ayuda. Puedes recuperar UNA cosa que te esté faltando. ¿Cuál eliges?",
            "triggerConditions": {
                "dayRange": [
                    3,
                    13
                ],
                "requiredEquipment": [],
                "resourceThresholds": {
                    "logic": "OR",
                    "conditions": [
                        {
                            "metric": "electricidad",
                            "operator": "<",
                            "value": 30
                        },
                        {
                            "metric": "agua",
                            "operator": "<",
                            "value": 30
                        },
                        {
                            "metric": "oxigeno",
                            "operator": "<",
                            "value": 30
                        }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.35,
                "baseAvoidChance": 0.65,
                "crewModifiers": []
            },
            "gameplayMechanics": {
                "resourcesAffected": [
                    "electricidad",
                    "agua",
                    "oxigeno"
                ],
                "playerChoiceA": {
                    "action": "Cargar las baterías",
                    "sacrifice": "Sin costo",
                    "benefit": "Ganas 25% de energía",
                    "effects": {
                        "electricidad": 25,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Las baterías se llenan gracias al Sol."
                },
                "playerChoiceB": {
                    "action": "Recuperar agua de las tuberías",
                    "sacrifice": "Sin costo",
                    "benefit": "Ganas 18 L de agua",
                    "effects": {
                        "electricidad": 0,
                        "agua": 18,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Sacas agua limpia que estaba atrapada en los tubos."
                },
                "playerChoiceC": {
                    "action": "Abrir los tanques de aire de repuesto",
                    "sacrifice": "Sin costo",
                    "benefit": "Ganas 5 kg de oxígeno",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 5
                    },
                    "result": "Los tanques extra llenan la cabina de aire fresco."
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
            "situationTitle": "¡El huerto creció muy rápido!",
            "kidFriendlyContext": "La luz especial hizo que las plantas crecieran más de lo esperado. El astrobiólogo dice que puedes usarlas para ayudar al equipo. ¿Qué eliges?",
            "triggerConditions": {
                "dayRange": [
                    4,
                    13
                ],
                "requiredEquipment": [
                    "VEGGIE_GARDEN"
                ],
                "resourceThresholds": {
                    "logic": "OR",
                    "conditions": [
                        {
                            "metric": "comida",
                            "operator": "<",
                            "value": 30
                        },
                        {
                            "metric": "salud",
                            "operator": "<",
                            "value": 30
                        }
                    ]
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.3,
                "baseAvoidChance": 0.7,
                "crewModifiers": []
            },
            "gameplayMechanics": {
                "resourcesAffected": [
                    "comida",
                    "salud",
                    "oxigeno"
                ],
                "playerChoiceA": {
                    "action": "Cosechar verduras frescas",
                    "sacrifice": "Sin costo",
                    "benefit": "Ganas 3.5 kg de comida",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 3.5,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "La despensa se llena de verduras ricas y sanas."
                },
                "playerChoiceB": {
                    "action": "Preparar vitaminas con las plantas",
                    "sacrifice": "Sin costo",
                    "benefit": "Ganas 18% de salud",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": 18,
                        "oxigeno": 0
                    },
                    "result": "Las vitaminas le devuelven la fuerza a toda la tripulación."
                },
                "playerChoiceC": {
                    "action": "Dejar que las plantas limpien el aire",
                    "sacrifice": "Sin costo",
                    "benefit": "Ganas 3.5 kg de oxígeno",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 3.5
                    },
                    "result": "Las plantas respiran el aire usado y sueltan oxígeno limpio."
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
            "situationTitle": "¡La noche de la Luna es larguísima y helada!",
            "kidFriendlyContext": "En la Luna la noche dura 14 días. Hace muchísimo frío y necesitas calefacción, pero el robot que saca agua de hielo también gasta mucha energía.",
            "triggerConditions": {
                "dayRange": [
                    15,
                    30
                ],
                "requiredEquipment": [
                    "KILOPOWER_REACTOR",
                    "ISRU_WATER_MINER"
                ],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": [
                        {
                            "metric": "agua",
                            "operator": "<",
                            "value": 40
                        }
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
                        "triggerChanceDelta": -0.3,
                        "finalTriggerChance": 0.15,
                        "finalAvoidChance": 0.85
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": [
                    "electricidad",
                    "agua",
                    "salud"
                ],
                "playerChoiceA": {
                    "action": "Usar toda la energía para sacar hielo",
                    "sacrifice": "Pierdes 22% de energía",
                    "benefit": "Ganas 25 L de agua",
                    "effects": {
                        "electricidad": -22,
                        "agua": 25,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Consigues agua, pero casi se acaba la energía."
                },
                "playerChoiceB": {
                    "action": "Parar el robot y usar la calefacción",
                    "sacrifice": "Pierdes 15 L de agua y 6% de salud",
                    "benefit": "No pierdes energía",
                    "effects": {
                        "electricidad": 0,
                        "agua": -15,
                        "comida": 0,
                        "salud": -6,
                        "oxigeno": 0
                    },
                    "result": "Cuidas la energía, pero gastas agua de emergencia."
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
            "situationTitle": "¡Polvo filoso en los trajes espaciales!",
            "kidFriendlyContext": "El polvo de la Luna es tan filoso como vidrio molido. Se metió en las juntas de los trajes y hay que limpiarlo.",
            "triggerConditions": {
                "dayRange": [
                    5,
                    42
                ],
                "requiredEquipment": [
                    "XEMU_SUITS",
                    "LTV_ROVER"
                ],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": []
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.5,
                "baseAvoidChance": 0.5,
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
                "resourcesAffected": [
                    "oxigeno",
                    "salud",
                    "agua"
                ],
                "playerChoiceA": {
                    "action": "Limpiar los trajes con aire a presión",
                    "sacrifice": "Pierdes 4 kg de oxígeno y 8% de salud",
                    "benefit": "No gastas nada de agua",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": -8,
                        "oxigeno": -4
                    },
                    "result": "Los trajes quedan limpios sin usar agua, pero el trabajo cansa."
                },
                "playerChoiceB": {
                    "action": "Lavar los trajes con agua",
                    "sacrifice": "Pierdes 18 L de agua",
                    "benefit": "No pierdes oxígeno ni salud",
                    "effects": {
                        "electricidad": 0,
                        "agua": -18,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "El agua se lleva el polvo fácil, pero gastas mucha agua."
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
            "situationTitle": "¡Se está congelando la estación!",
            "kidFriendlyContext": "Un tubo de afuera perdió el líquido que mantiene el calor. Los pasillos se están enfriando y los 6 astronautas tienen frío.",
            "triggerConditions": {
                "dayRange": [
                    4,
                    19
                ],
                "requiredEquipment": [
                    "KILOPOWER_REACTOR",
                    "IROSA_SOLAR"
                ],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": [
                        {
                            "metric": "electricidad",
                            "operator": "<",
                            "value": 45
                        }
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
                        "finalTriggerChance": 0.2,
                        "finalAvoidChance": 0.8
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": [
                    "electricidad",
                    "salud",
                    "oxigeno"
                ],
                "playerChoiceA": {
                    "action": "Prender todos los calentadores",
                    "sacrifice": "Pierdes 25% de energía y 3% de salud",
                    "benefit": "No pierdes oxígeno",
                    "effects": {
                        "electricidad": -25,
                        "agua": 0,
                        "comida": 0,
                        "salud": -3,
                        "oxigeno": 0
                    },
                    "result": "La estación se calienta rápido, pero casi se acaba la batería."
                },
                "playerChoiceB": {
                    "action": "Cerrar las puertas y arreglar el tubo desde afuera",
                    "sacrifice": "Pierdes 16% de salud y 3.5 kg de oxígeno",
                    "benefit": "No pierdes energía",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": 0,
                        "salud": -16,
                        "oxigeno": -3.5
                    },
                    "result": "Arreglas el tubo, pero el frío y la salida cansan al equipo."
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
            "situationTitle": "¡La máquina de agua se tapó!",
            "kidFriendlyContext": "Unas bacterias inofensivas formaron una capa pegajosa dentro de la máquina que limpia el agua. Ahora el filtro está tapado.",
            "triggerConditions": {
                "dayRange": [
                    25,
                    165
                ],
                "requiredEquipment": [
                    "WRS_RECYCLER"
                ],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": [
                        {
                            "metric": "agua",
                            "operator": "<",
                            "value": 35
                        }
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
                        "triggerChanceDelta": -0.3,
                        "finalTriggerChance": 0.15,
                        "finalAvoidChance": 0.85
                    }
                ]
            },
            "gameplayMechanics": {
                "resourcesAffected": [
                    "electricidad",
                    "oxigeno",
                    "agua",
                    "salud"
                ],
                "playerChoiceA": {
                    "action": "Limpiar los tubos con calor y ozono",
                    "sacrifice": "Pierdes 20% de energía y 2 kg de oxígeno",
                    "benefit": "No pierdes agua",
                    "effects": {
                        "electricidad": -20,
                        "agua": 0,
                        "comida": 0,
                        "salud": 0,
                        "oxigeno": -2
                    },
                    "result": "La máquina vuelve a funcionar y cuidas tu agua."
                },
                "playerChoiceB": {
                    "action": "Desarmar y limpiar el filtro a mano",
                    "sacrifice": "Pierdes 28 L de agua y 7% de salud",
                    "benefit": "No gastas energía ni oxígeno",
                    "effects": {
                        "electricidad": 0,
                        "agua": -28,
                        "comida": 0,
                        "salud": -7,
                        "oxigeno": 0
                    },
                    "result": "Pierdes agua por dos días mientras limpian a mano."
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
            "situationTitle": "¡Una tormenta gigante de polvo cubre Marte!",
            "kidFriendlyContext": "El polvo tapa el cielo durante semanas y los paneles solares ya no funcionan. Tienes que decidir si usas energía para las plantas o la guardas.",
            "triggerConditions": {
                "dayRange": [
                    90,
                    115
                ],
                "requiredEquipment": [
                    "APH_GREENHOUSE",
                    "SABATIER_SYSTEM"
                ],
                "resourceThresholds": {
                    "logic": "AND",
                    "conditions": []
                }
            },
            "probabilities": {
                "baseTriggerChance": 0.6,
                "baseAvoidChance": 0.4,
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
                "resourcesAffected": [
                    "electricidad",
                    "agua",
                    "comida",
                    "salud"
                ],
                "playerChoiceA": {
                    "action": "Darle energía a la granja",
                    "sacrifice": "Pierdes 18% de energía y 15 L de agua",
                    "benefit": "Ganas 4.5 kg de comida",
                    "effects": {
                        "electricidad": -18,
                        "agua": -15,
                        "comida": 4.5,
                        "salud": 0,
                        "oxigeno": 0
                    },
                    "result": "Las luces de la granja siguen prendidas y hay comida fresca."
                },
                "playerChoiceB": {
                    "action": "Apagar la granja y comer menos",
                    "sacrifice": "Pierdes 6.5 kg de comida y 10% de salud",
                    "benefit": "No pierdes energía ni agua",
                    "effects": {
                        "electricidad": 0,
                        "agua": 0,
                        "comida": -6.5,
                        "salud": -10,
                        "oxigeno": 0
                    },
                    "result": "Ahorras energía y agua, pero hay menos comida y los astronautas tienen hambre."
                }
            },
            "educationalTakeaway": "Las tormentas de polvo en Marte pueden durar meses y bloquear hasta el 99% de la luz solar."
        }
    ]
};
