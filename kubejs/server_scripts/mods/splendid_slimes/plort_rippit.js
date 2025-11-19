const rippitOutputs = {
    // t0 
    slimy: [
        { item: "minecraft:slime_ball", count: 6, weight: 1 },
        { item: "minecraft:slime_ball", count: 4, weight: 1 },
    ],
    puddle: [
        { item: "minecraft:clay_ball", count: 5, weight: 55 },
        { item: "minecraft:lily_pad", count: 3, weight: 15 },
        { item: "minecraft:lapis_lazuli", count: 7, weight: 30 },
    ],
    rocky: [
        { item: "minecraft:cobblestone", count: 10, weight: 50 },
        { item: "minecraft:tuff", count: 8, weight: 35 },
        { item: "minecraft:dripstone_block", count: 5, weight: 10 },
        { item: "minecraft:pointed_dripstone", count: 1, weight: 5 },
    ],
    monster: [
        { item: "minecraft:rotten_flesh", count: 5, weight: 60 },
        { item: "minecraft:string", count: 5, weight: 10 },
        { item: "minecraft:bone", count: 5, weight: 20 },
        { item: "minecraft:gunpowder", count: 5, weight: 10 },
    ],
    orby: [
        { item: "minecraft:experience_bottle", count: 3, weight: 1 },
        { item: "create:experience_nugget", count: 8, weight: 1 },
        { item: "create:experience_nugget", count: 5, weight: 1 },
    ],
    tabby: [
        { item: "minecraft:rabbit_foot", count: 1, weight: 5 },
        { item: "minecraft:rabbit_hide", count: 2, weight: 31 },
        { item: "minecraft:string", count: 3, weight: 32 },
        { item: "minecraft:feather", count: 2, weight: 32 },
    ],
    sweet: [
        { item: "minecraft:sugar", count: 4, weight: 200 },
        { item: "splendid_slimes:slime_candy", count: 1, weight: 1 }
    ],
    lush: [
        { item: "minecraft:flowering_azalea", count: 3, weight: 1 },
        { item: "minecraft:moss_block", count: 5, weight: 1 },
    ],
    dusty: [
        { item: "minecraft:gravel", count: 15, weight: 1 },
        { item: "alexscaves:sulfur_dust", count: 2, weight: 1 },
        { item: "create:cinder_flour", count: 5, weight: 1 },
    ],
    crystal: [
        { item: "quark:indigo_corundum", count: 5, weight: 1 },
        { item: "minecraft:amethyst_shard", count: 3, weight: 1 },
        { item: "minecraft:calcite", count: 8, weight: 1 },
        { item: "minecraft:lapis_lazuli", count: 4, weight: 1 },
    ],
    sandy: [
        { item: "minecraft:sand", count: 27, weight: 70 },
        { item: "minecraft:nautilus_shell", count: 1, weight: 25 },
        { item: "minecraft:scute", count: 3, weight: 5 },
    ],
    fire: [
        { item: "minecraft:blaze_powder", count: 3, weight: 40 },
        { item: "minecraft:charcoal", count: 7, weight: 40 },
        { item: "minecraft:fire_charge", count: 2, weight: 20 },
    ],
    alien: [
        { item: "minecraft:chorus_flower", count: 1, weight: 10 },
        { item: "minecraft:chorus_fruit", count: 8, weight: 45 },
        { item: "minecraft:end_stone", count: 16, weight: 45 },
    ],
    // t0 caves
    candy: [
        { item: 'alexscaves:sharpened_candy_cane', count: 1, weight: 20 },
        { item: 'alexscaves:candy_cane', count: 4, weight: 40 },
        { item: 'alexscaves:gumball_pile', count: 3, weight: 40 }
    ],
    abyssal: [
        { item: 'alexscaves:ortholance', count: 1, weight: 30 },
        { item: 'alexscaves:bioluminesscence', count: 6, weight: 30 },
        { item: 'alexscaves:immortal_embryo', count: 1, weight: 10 },
        { item: 'alexscaves:depth_charge', count: 4, weight: 30 }
    ],
    rad: [
        { item: 'alexscaves:uranium_shard', count: 4, weight: 100 }
    ],
    forlorn: [
        { item: 'alexscaves:moth_dust', count: 4, weight: 35 },
        { item: 'alexscaves:dark_tatters', count: 4, weight: 35 },
        { item: 'alexscaves:occult_gem', count: 1, weight: 30 }
    ],
    jurassic: [
        { item: 'alexscaves:heavy_bone', count: 4, weight: 30 },
        { item: 'alexscaves:tough_hide', count: 4, weight: 40 },
        { item: 'alexscaves:dinosaur_chop', count: 4, weight: 30 }
    ],
    neodymium: [
        { item: 'alexscaves:raw_scarlet_neodymium', count: 4, weight: 35 },
        { item: 'alexscaves:raw_azure_neodymium', count: 4, weight: 35 },
        { item: 'alexscaves:ferrouslime_ball', count: 4, weight: 30 }
    ],
    // t1
    bony: [
        { item: 'minecraft:bone', count: 8, weight: 40 },
        { item: 'minecraft:bone_block', count: 4, weight: 20 },
        { item: 'alexscaves:heavy_bone', count: 4, weight: 10 },
        { item: 'galosphere:silver_ingot', count: 4, weight: 30 }
    ],
    rotting: [
        { item: 'minecraft:rotten_flesh', count: 8, weight: 60 },
        { item: 'minecraft:iron_ingot', count: 6, weight: 40 }
    ],
    all_seeing: [
        { item: 'minecraft:spider_eye', count: 4, weight: 30 },
        { item: 'minecraft:string', count: 6, weight: 40 },
        { item: 'minecraft:copper_ingot', count: 6, weight: 30 }
    ],
    blazing: [
        { item: 'minecraft:blaze_rod', count: 4, weight: 20 },
        { item: 'minecraft:quartz', count: 6, weight: 30 },
        { item: 'minecraft:soul_sand', count: 4, weight: 30 },
        { item: 'minecraft:gold_ingot', count: 6, weight: 20 }
    ],
    prisma: [
        { item: 'minecraft:prismarine_shard', count: 4, weight: 30 },
        { item: 'minecraft:prismarine_crystals', count: 4, weight: 30 },
        { item: 'minecraft:pufferfish', count: 3, weight: 20 },
        { item: 'minecraft:sponge', count: 4, weight: 10 },
        { item: 'minecraft:trident', count: 1, weight: 10 }
    ],
    bitwise: [
        { item: 'minecraft:redstone', count: 6, weight: 50 },
        { item: 'minecraft:copper_ingot', count: 6, weight: 50 }
    ],
    boomcat: [
        { item: 'minecraft:gunpowder', count: 4, weight: 50 },
        { item: 'create:zinc_ingot', count: 6, weight: 50 }
    ],
    fungus: [
        { item: 'minecraft:brown_mushroom_block', count: 4, weight: 30 },
        { item: 'minecraft:red_mushroom_block', count: 4, weight: 30 },
        { item: 'minecraft:mycelium', count: 4, weight: 10 },
        { item: 'minecraft:nether_wart', count: 4, weight: 40 }
    ],
    ocean: [
        { item: 'minecraft:kelp', count: 4, weight: 30 },
        { item: 'minecraft:ink_sac', count: 4, weight: 30 },
        { item: 'minecraft:heart_of_the_sea', count: 1, weight: 10 },
        { item: 'minecraft:trident', count: 1, weight: 10 },
        { item: 'minecraft:diamond', count: 6, weight: 10 }
    ],
    stony: [
        { item: 'minecraft:andesite', count: 4, weight: 30 },
        { item: 'minecraft:diorite', count: 4, weight: 30 },
        { item: 'minecraft:granite', count: 4, weight: 30 },
        { item: 'minecraft:iron_ingot', count: 6, weight: 10 }
    ],
    tree: [
        { item: 'minecraft:oak_log', count: 8, weight: 20 },
        { item: 'minecraft:spruce_log', count: 8, weight: 20 },
        { item: 'minecraft:birch_log', count: 8, weight: 15 },
        { item: 'minecraft:jungle_log', count: 8, weight: 15 },
        { item: 'minecraft:acacia_log', count: 8, weight: 15 },
        { item: 'minecraft:dark_oak_log', count: 8, weight: 15 }
    ],
    phantom: [
        { item: 'minecraft:phantom_membrane', count: 4, weight: 60 },
        { item: 'minecraft:phantom_membrane', count: 4, weight: 10 },
        { item: 'create:zinc_ingot', count: 4, weight: 30 }
    ],

    // t2
    ender: [

    ],
    luminous: [

    ],
    magma: [

    ],
    charred: [

    ],
    weeping: [

    ],
    crimson: [

    ],
    warped: [

    ],
    geode: [

    ],
    gem: [

    ],
    dark: [

    ],
    sculk: [

    ],
    magnetic: [

    ],

    // t3
    shulking: [

    ],
    metallic: [

    ],
    minty: [

    ],
    jewel: [

    ],
    infernal: [

    ],
    mechanical: [

    ],
    tendril: [

    ],
    radiant: [

    ],
    
    // t4
    gold: [

    ],
    forge: [

    ],
    time: [

    ],
    
    // t5
    quantum: [

    ],
    nuclear: [

    ],
    
    // other
    burger: [

    ]
}

ServerEvents.recipes(e => {
    e.remove({ type: 'splendid_slimes:plort_ripping' })

    // loop over all slimes
    for (const [slimeType, slimeData] of Object.entries(global.slimeDefinitionsData)) {
        let recipeData = rippitOutputs[slimeType]
        // skip and log if slime type has no recipe data
        // not all slimes *need* the data this is just for noting
        if (recipeData === undefined) {
            console.warn(`no rippit data for - "${slimeType}"`)
            continue
        }
        e.custom({
            type: "splendid_slimes:plort_ripping",
            ingredient: {
                item: "splendid_slimes:plort",
                nbt: {
                    plort: {
                        id: `splendid_slimes:${slimeType}`
                    }
                }
            },
            results: recipeData
        }).id(`kubejs:generated/rippit/${slimeType}`)
    }

    // let placeholder = {
    //     type: "splendid_slimes:plort_ripping",
    //     ingredient: {
    //         item: "splendid_slimes:plort",
    //         nbt: {
    //             plort: {
    //                 id: "splendid_slimes:sweet"
    //             }
    //         }
    //     },
    //     results: [
    //         {
    //             item: "minecraft:sugar",
    //             count: 4,
    //             weight: 99
    //         },
    //         {
    //             item: "splendid_slimes:slime_candy",
    //             count: 1,
    //             weight: 1
    //         }
    //     ]
    // }
})