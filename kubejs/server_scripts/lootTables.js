LootJS.modifiers(e => {
    const grass = ['minecraft:grass', 'minecraft:tall_grass']
    const seeds = [
        'minecraft:wheat_seeds', 'minecraft:potato', 'minecraft:beetroot_seeds',
        'minecraft:melon_seeds', 'minecraft:pumpkin_seeds',
        'farmersdelight:tomato_seeds', 'farmersdelight:cabbage_seeds'
    ]

    for (let block of grass) {
        e.addBlockLootModifier(block)
            .removeLoot('minecraft:wheat_seeds')
            .randomChance(0.125)
            .addWeightedLoot([1, 2], seeds)
    }
})