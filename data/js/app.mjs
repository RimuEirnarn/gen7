import { setup, goto } from "../external/enigmarimu.js/pages.mjs";
import { Template } from "../external/enigmarimu.js/template.mjs";
import "./actions.mjs"
import { system } from "./init.mjs";

const STATE = {
  initialized: false
}

async function navbar_setup() {
  const navbar = await Template.with_url("navbar", "/template/navbar.html", 10);

  navbar.render("#nav", {
    app_name: await system.get_appname()
  })

  document.querySelector("#nav").querySelectorAll("a[href]").forEach((element) => {
    element.addEventListener("click", async (event) => {
      event.preventDefault()
      const url = element.getAttribute('href')
      if (!url)
        return;
      try {
        await goto(url)
      } catch {
        throw new Error(`Page from URL: ${url} doesn't exists`)
      }
    })
  })
}

async function page_setup() {
  const routes = {
    "/": "/pages/index.mjs",
    "/history": "/pages/history.mjs"
  };

  const routeSetup = {};
  for (const [path, modulePath] of Object.entries(routes)) {
    routeSetup[path] = (await import(modulePath)).setup();
  }

  setup(routeSetup);
}

async function main() {
  if (STATE.initialized) return;
  console.log("Initializing")
  await navbar_setup()
  await page_setup()

  goto('/')
  STATE.initialized = true
}

await main()
