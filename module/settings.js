export const registerSettings = function () {

  game.settings.register("adnd", "initiative", {
    name: game.i18n.localize("ADND.Setting.Initiative"),
    hint: game.i18n.localize("ADND.Setting.InitiativeHint"),
    default: "group",
    scope: "world",
    type: String,
    config: true,
    choices: {
      individual: "ADND.Setting.InitiativeIndividual",
      group: "ADND.Setting.InitiativeGroup",
    },
    onChange: _ => window.location.reload()
  });

  game.settings.register("adnd", "rerollInitiative", {
    name: game.i18n.localize("ADND.Setting.RerollInitiative"),
    hint: game.i18n.localize("ADND.Setting.RerollInitiativeHint"),
    default: "reset",
    scope: "world",
    type: String,
    config: true,
    choices: {
      keep: "ADND.Setting.InitiativeKeep",
      reset: "ADND.Setting.InitiativeReset",
      reroll: "ADND.Setting.InitiativeReroll",
    }
  });

  game.settings.register("adnd", "ascendingAC", {
    name: game.i18n.localize("ADND.Setting.AscendingAC"),
    hint: game.i18n.localize("ADND.Setting.AscendingACHint"),
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
    onChange: _ => window.location.reload()
  });

  game.settings.register("adnd", "morale", {
    name: game.i18n.localize("ADND.Setting.Morale"),
    hint: game.i18n.localize("ADND.Setting.MoraleHint"),
    default: false,
    scope: "world",
    type: Boolean,
    config: true,
  });

  game.settings.register("adnd", "encumbranceOption", {
    name: game.i18n.localize("ADND.Setting.Encumbrance"),
    hint: game.i18n.localize("ADND.Setting.EncumbranceHint"),
    default: "detailed",
    scope: "world",
    type: String,
    config: true,
    choices: {
      disabled: "ADND.Setting.EncumbranceDisabled",
      basic: "ADND.Setting.EncumbranceBasic",
      detailed: "ADND.Setting.EncumbranceDetailed",
      complete: "ADND.Setting.EncumbranceComplete",
    },
    onChange: _ => window.location.reload()
  });

  game.settings.register("adnd", "significantTreasure", {
    name: game.i18n.localize("ADND.Setting.SignificantTreasure"),
    hint: game.i18n.localize("ADND.Setting.SignificantTreasureHint"),
    default: 800,
    scope: "world",
    type: Number,
    config: true,
    onChange: _ => window.location.reload()
  });
};
