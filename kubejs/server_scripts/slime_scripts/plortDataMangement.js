// priority: 999

// on world load, set servers slime value data if not set yet in the world
ServerEvents.loaded(e => {
    // this SHOULD only occur on first world load, but in the future if the pack continues
    //  it should instead check if the entries are equal to base data and merge them if not for update compatibility
    if (e.server.persistentData['slime_value_data'] === undefined) {
        // set all base server values
        e.server.persistentData['slime_value_data'] = global.baseSlimeValueData
        e.server.persistentData['daily_sold_plorts'] = {}
        e.server.persistentData['daily_sold_total'] = 0
        e.server.persistentData['reset_cooldown'] = 24000

        e.server.tell(`| §6Goooood morning, Rancher!`)
        // run first daily updates, unsure if this should stay on first day
        dailyUpdates(e)
    }
})

// send slime value data to clients for tooltip information
PlayerEvents.tick(e => {
    if (Utils.server.tickCount % 200 === 0) { // update every 10 seconds
        e.player.sendData('kubejs:slime_value_data', e.server.persistentData['slime_value_data'])
    }
})

// debug used for testing, comment on release
ItemEvents.firstLeftClicked('minecraft:diamond_sword', e => {
    e.player.tell(`reset all stored server data to defaults!`)
    e.server.persistentData['slime_value_data'] = global.baseSlimeValueData
    e.server.persistentData['daily_sold_plorts'] = {}
    e.server.persistentData['daily_sold_total'] = 0
})

// Checking if daily updates should run
ServerEvents.tick(e => {
    try {
        e.server.persistentData['reset_cooldown'] -= 1
        if (Utils.server.tickCount % 20 != 0) { return } // update once a second

        if (e.server.persistentData['reset_cooldown'] <= 0) { // reset once a day
            dailyUpdates(e) // run daily updates
            e.server.persistentData['reset_cooldown'] = 24000
        }

    } catch (err) {
        console.error(err)
    }
})