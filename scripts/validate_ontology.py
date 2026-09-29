from pathlib import Path

from pyshacl import validate
from rdflib import Graph, Literal, Namespace, RDF

ROOT = Path(__file__).resolve().parents[1]
AIEMS = Namespace("https://w3id.org/ev-energy-twin/ai-ems#")


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
observation = next(missing_value.subjects(RDF.type, AIEMS.Observation))
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
good_observation = next(bad_observation.subjects(RDF.type, AIEMS.Observation))
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

print("PASS: ontology and SHACL parse; closed-loop fixture conforms; missing data is explicit; invalid inputs are rejected.")
