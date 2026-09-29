# AI EMS ontology coverage register

This register is the Phase 1 completion checklist. It describes the domain surface that must be modeled and tested before EMS runtime, adapters, or UI work starts. A row passes only when the named terms, SHACL rules, positive and negative fixtures, and an acceptance scenario are present. Provider-specific wire fields belong in a versioned adapter profile or preserved source evidence, not in the canonical vocabulary by default.

| Domain slice | Canonical concepts and fields | Required semantic/conformance checks |
| --- | --- | --- |
| Site topology | Site, grid connection, meter, assets, EVSE, connectors, building loads; stable identifiers and site membership | Identity uniqueness in a scenario, topology links, source of authority, valid asset states |
| Weather observations | Temperature, humidity, wind speed/direction, precipitation, cloud cover, global/direct/diffuse irradiance; sensor/location, quantity, UCUM unit, event/record time, quality | Physical ranges, missing/stale/estimated handling, source and event-time provenance |
| Weather and energy forecasts | PV, weather, building load, price and grid forecast; product, issue time, valid interval, horizon, member/ensemble, confidence | Forecast issue time differs from target valid time; revision/correction and stale-policy behavior |
| PV and inverter | AC/DC output, available power, curtailment, power factor, operating state, limits, capability and dispatch | No command outside declared capability; measurement distinct from requested dispatch |
| Grid and meter | Import/export envelope, measured active/reactive power, voltage/current/frequency, connection state, meter register, direction and interval | Explicit import/export semantics, authority and precedence, timestamped cumulative/interval readings |
| Building and controllable loads | Total/flexible load, HVAC or other controllable load, schedule, comfort/operating constraint, authorized writable points | Control authority and comfort bounds; unavailable point is unknown rather than zero |
| Tariff and market | Import/export price, currency, price basis, tariff component, interval, source, revision and forecast | Currency separate from UCUM; no ambiguous price period or import/export direction |
| Stationary storage | SOC, energy, usable capacity, reserve, charge/discharge power, efficiencies, operating mode, availability and limits | SOC/efficiency bounds, mutually valid charge/discharge direction, reserve and capability enforcement |
| Vehicle and charging service | Pseudonymous vehicle/session, arrival/departure, requested energy or target SOC, minimum departure energy, priority and consent | Privacy-minimal identifiers, reachable target/shortfall outcome, consent status and temporal ordering |
| EVSE and connector capability | Availability, status, connector format, phase mode/count, current/voltage/power bounds, smart-charging functions and freshness | Per-connector/device limit, unsupported/unknown capability behavior, command range checks |
| External flexibility event | OpenADR identity, signal/target, priority, interval, revision, update/cancel, requested reduction and site applicability | Active/update/cancel lifecycle, duplicates, out-of-order/revision handling, overlapping events |
| Plan and response | Assessment, explanation/confidence, objective/strategy, allocations, asset dispatch, flexibility response, expected cost/energy/service outcome | Every decision points to immutable input snapshot and model/rule version; hard constraints remain deterministic |
| Command lifecycle | Neutral intent, target asset/connector/session, action/setpoint, units/direction, issue/expiry, correlation, attempt, retry, ack/NACK/unknown and lifecycle state | Accepted does not imply delivered; duplicate/idempotent retry, expiry, cancellation and late ack handling |
| Charger/device feedback | Status/state changes, faults/severity, availability, power, meter values, connector state, session linkage, optional vehicle SOC, communication state | Feedback source and event/record time, quality/freshness, session/transaction correlation, faults trigger safe replan |
| Reconciliation and fallback | Planned vs acknowledged vs measured values, delivered energy, deviation, tolerance, reason, local protection/fallback mode | Requested/accepted/delivered values stay distinct; safe behavior for missing inputs and communication loss |
| Standards and adapters | Adapter boundary/mode, standard reference/version/edition, profile subset/revision, canonical mappings, declared capability, exchange evidence and conformance result | Independent per-component selection for virtual/replay/shadow/live; unsupported fields are preserved or explicitly rejected |
| Replay and provenance | Input snapshot, scenario fingerprint, clock, seed, PRNG/simulator/profile versions, source payload digest, exchanges and outputs | Identical pinned inputs reproduce normalized events and decisions; replay records identify every profile used |

## Gate evidence

For each row, the review records links to ontology terms, SHACL shapes, fixture paths and CI checks. “Not applicable” requires a reason and an explicit site profile assumption. Passing RDF/SHACL parsing alone does not pass this register. The Phase 1 gate is complete only when the whole register has evidence and reviewers sign off on unresolved provider-specific mappings.

## Current draft evidence

The current vocabulary has the principal asset, observation, weather/forecast, constraint, session, assessment, plan, command, acknowledgement, feedback, reconciliation, profile, standard, protocol exchange and deterministic-run concepts. The closed-loop example demonstrates representative weather/PV/building-load inputs and a versioned virtual OCPP boundary. This is starter evidence only: all rows still require full shape coverage, distinct positive/negative fixtures and acceptance scenarios before Phase 1 can pass.
