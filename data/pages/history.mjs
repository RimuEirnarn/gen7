import { bound_buttons, globalRepository } from "../external/enigmarimu.js/binder/actions.mjs"
import { Template } from "../external/enigmarimu.js/template.mjs"
import { system } from "../js/init.mjs"

/**
 *
 * @param {string} arg
 */
globalRepository.fav = async (arg) => {
  const [id, favorable_status] = arg.split('/', 2)
  console.log(id, favorable_status)
  let reflect = null

  if (!Number.parseInt(favorable_status)) {
    await system.fav(id)
    reflect = true
  } else {
    await system.unfav(id)
    reflect = false
  }

  const btn = document.querySelector(`[data-id="${id}/btn"]`)
  if (reflect) {
    btn?.classList.remove('btn-primary')
    btn?.classList.add('btn-danger')
  }

  if (!reflect) {
    btn?.classList.remove('btn-danger')
    btn?.classList.add('btn-primary')
  }
}
const templ = await Template.with_url("table_data", "/template/table_data.html", 10)

async function setupHistPage() {
  return {}
}

async function postInit() {
  templ.batch_append("#hist", await (async () => {
    const d = []
    for (let i of await system.all()) {
      console.log(i)
      d.push({
        id: i.id,
        favorite: i.is_favorite ? "highlight" : "",
        description: i.description,
        favorable: i.is_favorite,
        favorable_btn: !i.is_favorite ? "btn-primary" : "btn-danger"
      })
    }
    return d
  })())
}

function setup() {
  return {
    url: "/pages/history.html",
    async init() {
      return await setupHistPage()
    },
    async post_init() {
      await postInit()
      bound_buttons(document.querySelector("#app"))
    }
  }
}

export { setup }
