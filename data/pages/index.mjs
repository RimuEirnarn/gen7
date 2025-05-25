import { system } from "../js/init.mjs"
import { globalRepository, bound_buttons } from "../external/enigmarimu.js/binder/actions.mjs"

globalRepository.dispatch = async () => await system.dispatch()


async function setupIndexPage() {
  return {
    app_name: `${await system.get_appname()} - ${await system.get_appdesc()}`
  }
}

function setup()  {
    return {
        url: "/pages/index.html",
        async init() {
            return await setupIndexPage()
        },
        async post_init() {
          bound_buttons(document.querySelector("#app"))
        }
    }
}

export { setup }
