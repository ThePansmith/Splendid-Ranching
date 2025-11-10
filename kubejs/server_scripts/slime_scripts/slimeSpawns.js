const slimeBiomeList = {
    "splendid_ranching:dry_reef": ["slimy", "tabby", "dusty", "sandy", "fire"],
    "splendid_ranching:indigo_quarry": ["puddle", "rocky", "monter", "orby", "lush", "crystal", "alien"],
    "splendid_ranching:magma_mounts": ["rocky", "monster", "fire", "dusty"],
    "splendid_ranching:moss_blanket": ["slimy", "puddle", "tabby", "lush"],
    "splendid_ranching:opal_desert": ["slimy", "orby", "sweet", "dusty", "crystal", "sandy", "alien"],
    "splendid_ranching:slimey_sea": ["puddle", "sandy", "lush", "crystal"],

    "alexscaves:abyssal_chasm": [],
    "alexscaves:candy_cavity": [],
    "alexscaves:forlorn_hollows": [],
    "alexscaves:magnetic_caves": [],
    "alexscaves:primordial_caves": [],
    "alexscaves:toxic_caves": []
}

EntityEvents.spawned('splendid_slimes:splendid_slime', e => {
    let biome = e.level.getBiome(e.entity.pos).unwrapKey().get().location()
    let slimeMob = e.entity
    if (slimeMob.nbt.Breed != false) { return }

    let newSlimeNbt = {
        "Breed": `splendid_slimes:${slimeBiomeList[biome][Math.floor(Math.random() * slimeBiomeList[biome].length)]}`,
        "Health": 100,
        "Happiness": 500,
        "Size": 1
    }
    Object.assign(slimeMob.nbt, newSlimeNbt)
    slimeMob.mergeNbt(newSlimeNbt)
})