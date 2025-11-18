ServerEvents.commandRegistry(e => {
    const { commands: Commands, arguments: Arguments } = e

    // command to print out coins from value
    // using this to make market quests lol
    e.register(Commands.literal("srCoinsFromValue")
        .then(Commands.argument("amount", Arguments.INTEGER.create(e))
            .executes(ctx => {
                let player = ctx.source.player
                let amount = Arguments.INTEGER.getResult(ctx, "amount")
                /** @type {Array} */
                let coins = global.calculateCoinsFromValue(amount, [])
                player.tell(`§6${amount}§a☻§r in coins:`)
                for (let coin of coins) {
                    player.tell(`${coin.count}x ${Item.of(coin.id).hoverName.string}`)
                }
                return 1
            })
        )
    )
    // command to interact with daily reset cooldown
    e.register(Commands.literal("srDailyReset")
        .then(Commands.literal("get")
            .executes(ctx => {
                let player = ctx.source.player
                player.tell(`daily reset cooldown is ${player.server.persistentData['reset_cooldown']}`)
                return 1
            })
        )
        .then(Commands.literal("set")
            .then(Commands.argument("value", Arguments.INTEGER.create(e))
                .executes(ctx => {
                    let player = ctx.source.player
                    player.server.persistentData['reset_cooldown'] = Arguments.INTEGER.getResult(ctx, "value")
                    player.tell(`daily reset cooldown set to ${player.server.persistentData['reset_cooldown']}`)
                    return 1
                })
            )
        )
    )

    // patchouli command requires OP normally, but this bypasses that
    // from kubejs server
    // https://discord.com/channels/303440391124942858/1172464187486785567/
    // used to open pages from questbook

    let command = "open-book"
    e.register(Commands.literal(command)
        .then(Commands.argument('book', Arguments.RESOURCE_LOCATION.create(e))
            .executes(ctx => {
                const book = Arguments.RESOURCE_LOCATION.getResult(ctx, "book")
                const username = ctx.source.entity.username;
                let cmd = `open-patchouli-book ${username} ${book}`
                Utils.server.runCommandSilent(cmd);
                return 1
            })
        )
    )
    e.register(Commands.literal(command)
        .then(Commands.argument('book', Arguments.RESOURCE_LOCATION.create(e))
            .then(Commands.argument('entry', Arguments.RESOURCE_LOCATION.create(e))
                .executes(ctx => {
                    const book = Arguments.RESOURCE_LOCATION.getResult(ctx, "book")
                    const entry = Arguments.RESOURCE_LOCATION.getResult(ctx, "entry")
                    const username = ctx.source.entity.username;
                    let cmd = `open-patchouli-book ${username} ${book} ${entry}`
                    Utils.server.runCommandSilent(cmd);
                    return 1
                })
            )
        )
    )
    e.register(Commands.literal(command)
        .then(Commands.argument('book', Arguments.RESOURCE_LOCATION.create(e))
            .then(Commands.argument('entry', Arguments.RESOURCE_LOCATION.create(e))
                .then(Commands.argument('page', Arguments.INTEGER.create(e))
                    .executes(ctx => {
                        const book = Arguments.RESOURCE_LOCATION.getResult(ctx, "book")
                        const entry = Arguments.RESOURCE_LOCATION.getResult(ctx, "entry")
                        const page = Arguments.INTEGER.getResult(ctx, "page")
                        const username = ctx.source.entity.username;
                        let cmd = `open-patchouli-book ${username} ${book} ${entry} ${page}`
                        Utils.server.runCommandSilent(cmd);
                        return 1
                    })
                )
            )
        )
    )
})