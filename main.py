"""Gamble your way; seeing whatever."""

from argh import arg, ArghParser
import webview
import system.db # pylint: disable=unused-import
import system.config
import system.sysproc
import system.deps

@arg("-d", "--debug", help="Set debug flag")
def main(debug: bool = False):
    """Gamble your way; seeing whatever."""
    webview.create_window(
        f"{system.config.APP_NAME} - {system.config.APP_DESC}",
        "data/base.html",
        js_api=system.sysproc.SystemAPI(),
        resizable=True,
        text_select=True,
    )
    webview.start(debug=debug)

@arg("-u", '--update', help='Install webui dependencies')
def install(update: bool = False):
    """Install client-side dependencies"""
    with open('webui_dependencies.json', 'r', encoding='utf-8') as file:
        (system.deps.CONFIG_DIR / "webui_dependencies.json").write_text(file.read())
    system.deps.install_webui_dependency(update)

if __name__ == "__main__":
    parser = ArghParser()
    parser.add_commands([main, install])
    parser.set_default_command(main)
    parser.dispatch()
