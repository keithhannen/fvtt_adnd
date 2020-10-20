// Import Modules
import { AdndItemSheet } from "./module/item/item-sheet.js";
import { AdndActorSheetCharacter } from "./module/actor/character-sheet.js";
import { AdndActorSheetMonster } from "./module/actor/monster-sheet.js";
import { preloadHandlebarsTemplates } from "./module/preloadTemplates.js";
import { AdndActor } from "./module/actor/entity.js";
import { AdndItem } from "./module/item/entity.js";
import { ADND } from "./module/config.js";
import { registerSettings } from "./module/settings.js";
import { registerHelpers } from "./module/helpers.js";
import * as chat from "./module/chat.js";
import * as treasure from "./module/treasure.js";
import * as macros from "./module/macros.js";
import * as party from "./module/party.js";
import { AdndCombat } from "./module/combat.js";

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", async function () {
  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d6 + @initiative.value",
    decimals: 2,
  };

  CONFIG.ADND = ADND;

  game.adnd = {
    rollItemMacro: macros.rollItemMacro,
  };

  // Custom Handlebars helpers
  registerHelpers();

  // Register custom system settings
  registerSettings();

  CONFIG.Actor.entityClass = AdndActor;
  CONFIG.Item.entityClass = AdndItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("adnd", AdndActorSheetCharacter, {
    types: ["character"],
    makeDefault: true,
  });
  Actors.registerSheet("adnd", AdndActorSheetMonster, {
    types: ["monster"],
    makeDefault: true,
  });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("adnd", AdndItemSheet, { makeDefault: true });

  await preloadHandlebarsTemplates();
});

/**
 * This function runs after game data has been requested and loaded from the servers, so entities exist
 */
Hooks.once("setup", function () {
  // Localize CONFIG objects once up-front
  const toLocalize = ["saves_short", "saves_long", "scores", "armor", "colors", "tags"];
  for (let o of toLocalize) {
    CONFIG.ADND[o] = Object.entries(CONFIG.ADND[o]).reduce((obj, e) => {
      obj[e[0]] = game.i18n.localize(e[1]);
      return obj;
    }, {});
  }
});

Hooks.once("ready", async () => {
  Hooks.on("hotbarDrop", (bar, data, slot) =>
    macros.createAdndMacro(data, slot)
  );
});

// License and KOFI infos
Hooks.on("renderSidebarTab", async (object, html) => {
  if (object instanceof ActorDirectory) {
    party.addControl(object, html);
  }
  if (object instanceof Settings) {
    let gamesystem = html.find("#game-details");
    // SRD Link
    let adnd = gamesystem.find('h4').last();
    adnd.append(` <sub><a href="https://oldschoolessentials.necroticgnome.com/srd/index.php">SRD<a></sub>`);

    // License text
    const template = "systems/adnd/templates/chat/license.html";
    const rendered = await renderTemplate(template);
    gamesystem.find(".system").append(rendered);

    // User guide
    let docs = html.find("button[data-action='docs']");
    const styling = "border:none;margin-right:2px;vertical-align:middle;margin-bottom:5px";
    $(`<button data-action="userguide"><img src='/systems/adnd/assets/dragon.png' width='16' height='16' style='${styling}'/>Old School Guide</button>`).insertAfter(docs);
    html.find('button[data-action="userguide"]').click(ev => {
      new FrameViewer('https://mesfoliesludiques.gitlab.io/foundryvtt-adnd', {resizable: true}).render(true);
    });
  }
});

Hooks.on("preCreateCombatant", (combat, data, options, id) => {
  let init = game.settings.get("adnd", "initiative");
  if (init == "group") {
    AdndCombat.addCombatant(combat, data, options, id);
  }
});

Hooks.on("preUpdateCombatant", AdndCombat.updateCombatant);
Hooks.on("renderCombatTracker", AdndCombat.format);
Hooks.on("preUpdateCombat", AdndCombat.preUpdateCombat);
Hooks.on("getCombatTrackerEntryContext", AdndCombat.addContextEntry);

Hooks.on("renderChatLog", (app, html, data) => AdndItem.chatListeners(html));
Hooks.on("getChatLogEntryContext", chat.addChatMessageContextOptions);
Hooks.on("renderChatMessage", chat.addChatMessageButtons);
Hooks.on("renderRollTableConfig", treasure.augmentTable);
Hooks.on("updateActor", party.update);
