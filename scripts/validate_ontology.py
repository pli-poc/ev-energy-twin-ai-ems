from pathlib import Path

from pyshacl import validate
from rdflib import Graph, Literal, Namespace, RDF

ROOT = Path(__file__).resolve().parents[1]
AIEMS = Namespace("https://w3id.org/ev-energy-twin/ai-ems#")
EX = Namespace("https://example.org/ai-ems/demo#")


def load(path: Path) -> Graph:
    graph = Graph()
    graph.parse(path, format="turtle")
    return graph


ontology = load(ROOT / "ontology/ai-ems.ttl")
shapes = load(ROOT / "ontology/shapes.ttl")
example = load(ROOT / "ontology/examples/closed-loop.ttl")

conforms, _, report = validate(
    example,
    shacl_graph=shapes,
    ont_graph=ontology,
    inference="rdfs",
    advanced=True,
)
if not conforms:
    raise SystemExit(f"Closed-loop example did not conform to the EMS shapes:\n{report}")

# Prove that a required control field is actually enforced by the shapes.
invalid = Graph()
for triple in example:
    invalid.add(triple)
command = next(invalid.subjects(RDF.type, AIEMS.CommandIntent))
invalid.remove((command, AIEMS.commandLimitKw, None))
invalid_conforms, _, invalid_report = validate(
    invalid,
    shacl_graph=shapes,
    ont_graph=ontology,
    inference="rdfs",
    advanced=True,
)
if invalid_conforms:
    raise SystemExit("SHACL accepted a charger command without a power limit.")

# Missing data is explicit and has no numeric value; a supposedly good
# observation without a value is invalid.
missing_value = Graph()
for triple in example:
    missing_value.add(triple)
observation = EX["pv-observation"]
missing_value.remove((observation, AIEMS.numericValue, None))
missing_value.remove((observation, AIEMS.dataQuality, None))
missing_value.add((observation, AIEMS.dataQuality, Literal("missing")))
missing_conforms, _, _ = validate(
    missing_value,
    shacl_graph=shapes,
    ont_graph=ontology,
    inference="rdfs",
    advanced=True,
)
if not missing_conforms:
    raise SystemExit("SHACL rejected an explicitly marked missing observation.")

bad_observation = Graph()
for triple in example:
    bad_observation.add(triple)
good_observation = EX["pv-observation"]
bad_observation.remove((good_observation, AIEMS.numericValue, None))
bad_conforms, _, _ = validate(
    bad_observation,
    shacl_graph=shapes,
    ont_graph=ontology,
    inference="rdfs",
    advanced=True,
)
if bad_conforms:
    raise SystemExit("SHACL accepted an observation with good quality but no value.")

# Weather data stays typed and distinguishes a forecast's issue and target times.
weather_forecast = next(example.subjects(RDF.type, AIEMS.WeatherForecast))
bad_forecast = Graph()
for triple in example:
    bad_forecast.add(triple)
bad_forecast.remove((weather_forecast, AIEMS.forecastFor, None))
bad_forecast_conforms, _, _ = validate(
    bad_forecast,
    shacl_graph=shapes,
    ont_graph=ontology,
    inference="rdfs",
    advanced=True,
)
if bad_forecast_conforms:
    raise SystemExit("SHACL accepted a weather forecast without its target valid time.")

# A versioned protocol boundary must identify the tested feature subset.
profile = next(example.subjects(RDF.type, AIEMS.AdapterProfile))
bad_profile = Graph()
for triple in example:
    bad_profile.add(triple)
bad_profile.remove((profile, AIEMS.profileSubset, None))
bad_profile_conforms, _, _ = validate(
    bad_profile,
    shacl_graph=shapes,
    ont_graph=ontology,
    inference="rdfs",
    advanced=True,
)
if bad_profile_conforms:
    raise SystemExit("SHACL accepted an adapter profile without a declared subset.")

print("PASS: ontology and SHACL parse; closed-loop fixture conforms; weather target time and adapter subset are required; invalid inputs are rejected.")
