// @ts-check
import { Template } from "../external/enigmarimu.js/template.mjs";
/** @typedef {import('./types.mjs').SystemAPI} SystemAPI */

/** @type {SystemAPI} */
let system;
/** @type {Template} */
let alert_tmpl;

/** @type {JQueryStatic} */
// @ts-ignore
let jQuery = window.$;

const DEFAULT_SETTINGS = {
    scheme: "blue",
    theme: "dark",
    currency: "USD",
    locale: 'en'
}

console.log("Initiating the system");

const INIT_STATE = {
  initjs_start: performance.now(),
  mainjs_start: 0,
  initjs_end: 0,
  mainjs_end: 0,
  init_to_runtime_start: 0,
  init_to_runtime_end: 0,
  total_start: performance.now(),
  total_end: 0
};

/**
 * Set log
 * @param {string} text
 */
function setLog(text) {
  const syslog = document.querySelector("#system-log");
  console.log(`[SYSLOG] ${text}`);
  if (syslog)
    // @ts-ignore
    syslog.innerText = text;
}

async function init_alert() {
  // @ts-ignore
  // document.querySelector("html").setAttribute("data-bs-theme", DEFAULT_THEME);
  setLog("Downloading alert template");
  return Template.with_url("alert", "/template/alert.html", 50);
}

try {
  // Attempt to initialize system and wait for pywebview to be available
  alert_tmpl = await init_alert();

  INIT_STATE.initjs_end = performance.now();

  setLog("Initiating pywebview API");
  INIT_STATE.pywebview_start = performance.now();
  system = await (async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 10);
    // @ts-ignore
    }).then(() => window.pywebview.api);
  })();

  if (!system) {
    throw new Error("PyWebview is not available.");
  }

  /** @type {SystemAPI} */
  // @ts-ignore
  window.sys = system;

  INIT_STATE.pywebview_end = performance.now();

  console.log(
    `Base system initialized at ${
      INIT_STATE.initjs_end - INIT_STATE.initjs_start
    }ms`
  );
  console.log(
    `PyWebview API initialized at ${
      INIT_STATE.pywebview_end - INIT_STATE.pywebview_start
    }ms`
  );
  setLog("Base initialization is completed");
  INIT_STATE.init_to_runtime_start = performance.now()
  // @ts-ignore
  document.querySelector('#app').innerHTML = ""
  document.querySelector('html')?.classList.remove('no-scrollbar')
} catch (error) {
  console.error("Error initializing pywebview:", error);
  // @ts-ignore
  const spinner = $(document.querySelector("#base-spinner"))
  const syslog = document.querySelector('#system-log')
  // @ts-ignore
  spinner.removeClass("spinner-border")
  // @ts-ignore
  spinner.addClass('fs-3')
  // @ts-ignore
  spinner.html(`<span class='text-danger'><i class="bi bi-exclamation-triangle-fill"></i></span>`)
  syslog?.classList.add("text-danger")
  // @ts-ignore
  syslog.innerText = "Unable to load the app. Pywebview is unavailable. Please refresh"
}

export { system, INIT_STATE, setLog, jQuery, };
