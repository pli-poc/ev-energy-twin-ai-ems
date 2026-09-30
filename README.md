# EV Energy Twin AI EMS

A standalone AI EMS prototype built on the EV Energy Twin optimizer. The twin remains the deterministic physical simulator; AI-assisted signal assessment, safe scheduling, protocol commands and charger feedback are planned in [the build plan](docs/ai-ems-build-plan.md). The initial domain model is in [ontology/](ontology/). This repository has no ChargeWeave dependency.

## See the EMS demo

Open the [hosted simulation](https://pli-poc.github.io/ev-energy-twin-ai-ems/), choose a scenario and strategy, then use the timeline chart selector to switch between **Site power**, **Delivered energy**, **Selected tariff**, **Compare regions**, and **Environment**. All views follow the same simulation clock. The regional tariff curves and weather drivers are synthetic and labeled as such. Select **EMS control loop** below the chart to inspect how the selected time flows through signal assessment and dispatch to the virtual charger boundary and feedback stages. Try **EMS connection lost** around 10:00 to inspect a withheld remote command and local fallback, or **Restricted connection** around 09:00 to inspect a constrained dispatch.

This is a deterministic, synthetic demonstration trace around the existing simulator. It does not yet run a live AI EMS, connect external weather/grid feeds, or send OCPP messages to a charger. The charger acknowledgement is generated locally for demonstration; it is not a conformance test. The ontology and standards profiles are the design baseline for implementing those adapters and runtime stages.

## Train and compare a learned policy

Open the [ML training lab](https://pli-poc.github.io/ev-energy-twin-ai-ems/training/) to generate a seeded, full-year synthetic dataset from the same Energy Twin simulator. It carries the selected scenario's charging and battery settings into the lab, varies seasonal demand and weather, and includes arrival and departure schedules, tariff profiles, user preferences, charger constraints, and battery state. Training and evaluation use week-grouped splits to reduce leakage between nearby days.

The lab fits a compact neural policy in a browser worker, reports held-out test metrics, and lets you save the model locally or export/import its JSON package. Returning to the twin makes the learned policy available as a seventh strategy alongside the six baselines; it remains subject to the simulator's physical safety limits. All generated data and results are illustrative and synthetic. A trained package stays in that browser's local storage unless exported, and this prototype does not train on operational charging data or deploy a live controller.


## Simulator development roadmap

Open the [interactive development roadmap](https://pli-poc.github.io/ev-energy-twin-ai-ems/roadmap/) for the current simulator capabilities, the ontology scope review gate, and the evidence-based sequence from deterministic synthetic event replay through safe recommendations, virtual charger feedback, resilience testing and later portability. The roadmap distinguishes today’s synthetic demonstrations from future EMS runtime and real-device work.
