// first server load 
ServerEvents.loaded(e => {
    let started = e.server.persistentData['started']
    if (started == undefined || !started) {
        //  setting game rules
        e.server.gameRules.set("doTraderSpawning", false)
        e.server.gameRules.set("doInsomnia", false)
        e.server.gameRules.set("doPatrolSpawning", false)
        e.server.gameRules.set("doDaylightCycle", false)
        e.server.gameRules.set("keepInventory", true)
        e.server.gameRules.set("disableRaids", true)
        e.server.gameRules.set("playersSleepingPercentage", 50)
    }
    e.server.persistentData['started'] = true
})