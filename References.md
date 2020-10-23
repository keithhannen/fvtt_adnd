References

to replace text in a journal entry:
    game.journal.getName("SHEET NAME").data.content=

to append text in a journal entry:
    let pLootSheet = game.journal.getName("Party Loot Sheet");
    const content = duplicate(pLootSheet.data.content);
    const html = `<p>Some html content to append</p>`;
    const newContent = content.concat(html);
    pLootSheet.update({content: newContent});

to render a journal entry:
    game.journal.getName("SHEET NAME").render(true)