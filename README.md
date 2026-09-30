# EV Energy Twin AI EMS

A standalone AI EMS prototype built on the EV Energy Twin optimizer. The twin remains the deterministic physical simulator; AI-assisted signal assessment, safe scheduling, protocol commands and charger feedback are planned in [the build plan](docs/ai-ems-build-plan.md). The initial domain model is in [ontology/](ontology/). This repository has no ChargeWeave dependency.

## See the EMS demo

Open the [hosted simulation](https://pli-poc.github.io/ev-energy-twin-ai-ems/), choose a scenario and strategy, then select **EMS control loop**. Move the simulation time slider to replay how the current deterministic engine inputs flow through signal assessment and dispatch to the virtual charger boundary and feedback stages. Try **EMS connection lost** around 10:00 to inspect a withheld remote command and local fallback, or **Restricted connection** around 09:00 to inspect a constrained dispatch.

This is a deterministic, synthetic demonstration trace around the existing simulator. It does not yet run a live AI EMS, connect external weather/grid feeds, or send OCPP messages to a charger. The charger acknowledgement is generated locally for demonstration; it is not a conformance test. The ontology and standards profiles are the design baseline for implementing those adapters and runtime stages.
