export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
        //Character Sheets
        'systems/adnd/templates/actors/character-html.html',
        'systems/adnd/templates/actors/monster-html.html',
        //Actor partials
        //Sheet tabs
        'systems/adnd/templates/actors/partials/character-header.html',
        'systems/adnd/templates/actors/partials/character-attributes-tab.html',
        'systems/adnd/templates/actors/partials/character-abilities-tab.html',
        'systems/adnd/templates/actors/partials/character-spells-tab.html',
        'systems/adnd/templates/actors/partials/character-inventory-tab.html',
        'systems/adnd/templates/actors/partials/character-notes-tab.html',

        'systems/adnd/templates/actors/partials/monster-header.html',
        'systems/adnd/templates/actors/partials/monster-attributes-tab.html'
    ];
    return loadTemplates(templatePaths);
};
