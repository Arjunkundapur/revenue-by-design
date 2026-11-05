"""Revenue by Design: a self-contained GTM assessment, hosted by Streamlit."""
from pathlib import Path
import base64
import json
import streamlit as st

BASE = Path(__file__).resolve().parent
st.set_page_config(page_title="Revenue by Design | GTM Engineering", page_icon="↗", layout="wide", initial_sidebar_state="collapsed")
st.html("""<style>
[data-testid="stHeader"] {display:none;}
[data-testid="stMainBlockContainer"] {padding:0!important;max-width:100%!important;}
[data-testid="stVerticalBlock"] {gap:0!important;}
.stApp {background:#f7f8fc;}
[data-testid="stElementContainer"]:has(.stHtml) {margin:0;}
</style>""")
files = {name: (BASE / "frontend" / name).read_text(encoding="utf-8") for name in ["shell.html", "style.css", "app.js"]}
content = json.loads((BASE / "content.json").read_text())
pdf = BASE / "presentation.pdf"
content["pdf"] = base64.b64encode(pdf.read_bytes()).decode() if pdf.exists() else ""
workspace = st.components.v2.component(
    "revenue_by_design", html=files["shell.html"], css=files["style.css"], js=(BASE / "frontend" / "models.js").read_text() + "\n" + files["app.js"],
)
workspace(data=content, key="revenue_workspace", width="stretch", height="content")
