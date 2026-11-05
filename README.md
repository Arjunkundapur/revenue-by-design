# Revenue by Design

A presentation-ready GTM engineering assessment built for **Streamlit Community Cloud**. Five scenario chapters combine recommendations, evidence requirements, stakeholder ownership, execution plans, success metrics, trade-offs, challenge questions, and working interactive labs.

## Run locally

Use Python 3.12. From this folder:

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
streamlit run app.py
```

On Windows, activate with `.venv\Scripts\activate` instead. Open the Local URL printed by Streamlit.

No API keys, environment variables, databases, Node installation, paid integrations, or external fonts are required. Public reference links open externally only when selected. All calculations run inside the custom Streamlit frontend and all demo data is generated deterministically.

## Host on Streamlit Community Cloud

1. Unzip the project and upload its **contents** to a GitHub repository. Include the hidden `.streamlit` folder, `frontend/`, `content.json`, and `presentation.pdf` along with `app.py` and `requirements.txt`.
2. Open [Streamlit Community Cloud](https://share.streamlit.io/) and choose **Create app**.
3. Select that repository and branch. Set **Main file path** to `app.py`.
4. Under advanced settings, use **Python 3.12**. No secrets are needed.
5. Deploy, then open the resulting `.streamlit.app` URL and test Present, a lab control, and Download PDF.

If the project lives inside a repository subfolder, set the main file path to `that-folder/app.py`. Dependencies must remain alongside the entrypoint. The simplest configuration is to place the project files at the repository root.

This delivery is tested locally; it has not been published to your Streamlit account. Deployment uses your GitHub and Streamlit accounts. Official instructions: [Deploy your app](https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app).

## Present it

- **Present** opens an eight-screen guided walkthrough.
- Use **Left/Right arrows** or the on-screen buttons to move; **Esc** exits.
- **N** toggles speaker cues. Keep notes hidden while sharing your screen unless you intend to show them.
- **Open the live demo** exits the presentation and opens the corresponding lab. Press Present in a scenario to resume at its slide.
- **Download PDF** exports the nine-page backup (eight core slides plus a sources/assumptions appendix).
- `PRESENTER_GUIDE.md` contains a suggested 18-minute run-of-show and rehearsal questions.
- `offline.html` opens directly in a modern browser and contains the same app and embedded PDF. It is a useful backup when the hosted app or network is unavailable. Changes to source files do not automatically update this generated snapshot.

## What the labs do

1. **Lead quality:** change fit weight, routing threshold, source filters, identity cleaning, and cohort maturity. Compare observed queue yield and outcome coverage with a fixed baseline.
2. **Territories:** assign 200 prospective accounts across an illustrative six-person existing team plus three hires. Compare geography, strict regional industry eligibility, and hybrid preference. Change ramp capacity, inspect row-level rationale, search, and export all 200 accounts as CSV.
3. **Reporting:** reconcile 48 opportunities, show distinct exposure to overlapping data-quality exceptions, and vary unresolved quarter inclusion without claiming it is a calibrated forecast.
4. **Stages:** inspect a seven-to-five crosswalk, entry evidence, and the limits of reconstructing historical detail.
5. **Systems:** simulate healthy, failed, duplicate, stale, ambiguous-identity, and out-of-order score events, including recovery of a failed CRM write.

## Content and assumptions

`content.json` holds the scenario answers and public references. Edit wording there; restart/reload Streamlit to pick up changes. `frontend/models.js` holds deterministic data generators and calculations. `frontend/app.js` renders the interface; `frontend/style.css` controls appearance.

The brief supplies five situations, three incoming AEs, and 200 unassigned accounts. Six existing reps, geographic coverage, capacity units, scoring weights, maturity/freshness thresholds, stage names, and all numerical records are demonstration assumptions. Nothing in the app asserts knowledge of Rocketlane's internal CRM, ICP, pipeline, or operating stack. The requested AI-process section is omitted.

The allocation is a greedy heuristic, scoring replay is descriptive rather than causal, pipeline sensitivity is not a probability forecast, and sync events are simulations. Public company sources provide context only. Avoid presenting demo outcomes as measured business results.

## Files

```text
app.py                 Streamlit entrypoint
requirements.txt       Tested Streamlit version
.streamlit/config.toml Theme and app configuration
content.json           Detailed answers and public sources
frontend/              Custom UI and deterministic models
presentation.pdf       Presentation backup
PRESENTER_GUIDE.md     Rehearsal and discussion guide
ASSESSMENT_RESPONSE.md Full written answer for review or sharing
offline.html           Self-contained browser backup
```

## Verification

Validated with Streamlit 1.66.1 and Python 3.12. Allocation checks cover unique ownership, regional eligibility, strict-industry constraints, capacity bounds, and accounting for all 200 accounts at several ramp levels. Additional checks cover cohort maturity, duplicate resolution, metric bounds, pipeline reconciliation, and sync failure/recovery. Browser QA covers the scenario navigation, lab controls, presentation, and downloads. The PDF was rendered and visually reviewed.

Optional model checks (Node.js required only for this check): `node tests/check_models.mjs`. The standalone HTML snapshot was syntax-checked; direct-file browser preview is unavailable in this environment because its browser policy blocks file URLs. The Streamlit build was verified in the browser.
