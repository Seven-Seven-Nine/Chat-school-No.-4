import moduleTransition from "../../static/scripts/moduleTransition.js";

function not_found() {
  document.getElementById('link-return').onclick = () => moduleTransition(document.getElementById('module'), '/')
}

not_found();