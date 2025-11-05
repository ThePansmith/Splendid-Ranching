const slimeRecipes = {
    // recipe id, example recipe object
    placeholder: {
        // an input catalyst item that gets consumed when the recipe is ran (Optional, max 1)
        itemIn: { item: Item.of('minecraft:glowstone_dust'), chance: 0.05 },
        // an output slime entity (Optional, max 1)
        slimeOut: { count: 1, id: 'all_seeing' },
        // required slime entity inputs (Required > 0, recommend 2+, max 3)
        slimeIn: [{ count: 1, id: 'slimy' }, { count: 1, id: 'bony' }, { count: 1, id: 'rotting' }],
        // output slime hearts (Required > 0, required weight, max 3)
        heartOut: [{ count: 1, id: 'bony', weight: 6 }, { count: 1, id: 'rotting', weight: 7 }, { count: 1, id: 'all_seeing', weight: 2 }]
    },
    slimy_gold_to_luminous: {
        slimeIn: [{ count: 1, id: 'slimy' }, { count: 1, id: 'gold' }],
        heartOut: [{ count: 1, id: 'slimy', weight: 4 }, { count: 1, id: 'gold', weight: 5 }, { count: 1, id: 'luminous', weight: 1 }]
    }
}
delete slimeRecipes.placeholder // functions if you uncomment this for testing, removed for release

ServerEvents.recipes(e => {
    for (const [recipeName, recipeData] of Object.entries(slimeRecipes)) {
        // real recipes that function in slime breeder machine, probably hide this category from viewer on release
        let recipe = e.recipes.mbd2.slime_breeding()
            // real recipe entity input
            .inputEntities(
                recipeData.slimeIn.map(input => JsonIO.of({
                    count: input.count,
                    nbt: `{Breed:"splendid_slimes:${input.id}"}`,
                    value: { entityType: "splendid_slimes:splendid_slime" }
                }))
            )
            .id(`kubejs:mbd2/slime_breeder/real/${recipeName}`)
        // real recipe entity output
        if (recipeData.slimeOut) {
            recipe.outputEntities(
                JsonIO.of({
                    count: recipeData.slimeOut.count,
                    nbt: `{Breed:"splendid_slimes:${recipeData.slimeOut.id}"}`,
                    value: { entityType: "splendid_slimes:splendid_slime" }
                })
            )
        }
        // real recipe item input
        if (recipeData.itemIn) {
            if (recipeData.itemIn.chance) recipe.chance(recipeData.itemIn.chance)
            recipe.inputItems(recipeData.itemIn.item)
        }


        // fake recipe for recipe viewer displaying nicely, doesn't function
        let fakeRecipe = e.recipes.mbd2.fake_slime_breeding()
            .id(`kubejs:mbd2/slime_breeder/fake/${recipeName}`)
            .inputEntities(
                recipeData.slimeIn.map(input => JsonIO.of({
                    count: input.count,
                    nbt: `{Breed:"splendid_slimes:${input.id}"}`,
                    value: { entityType: "splendid_slimes:splendid_slime" }
                }))
            )
        if (recipeData.slimeOut) {
            fakeRecipe.outputEntities(
                JsonIO.of({
                    count: recipeData.slimeOut.count,
                    nbt: `{Breed:"splendid_slimes:${recipeData.slimeOut.id}"}`,
                    value: { entityType: "splendid_slimes:splendid_slime" }
                })
            )
        }
        if (recipeData.itemIn) {
            if (recipeData.itemIn.chance) fakeRecipe.chance(recipeData.itemIn.chance)
            fakeRecipe.uiName(`item_in0`, b => b
                .chance(recipeData.itemIn.chance)
                .inputItems(recipeData.itemIn.item)
            )
        }
        // fake recipe slime fake item inputs
        for (const slimeIn of recipeData.slimeIn) {
            fakeRecipe.uiName(`entity_item_in${recipeData.slimeIn.indexOf(slimeIn)}`, b => b
                .inputItems(Item.of(`splendid_slimes:slime_item`, slimeIn.count, `{slime:{id:"splendid_slimes:${slimeIn.id}"}}`).weakNBT())
            )
        }
        // fake recipe slime heart fake item outputs
        for (const heartOut of recipeData.heartOut) {
            let chance = heartOut.weight / recipeData.heartOut.reduce((a, b) => a + b.weight, 0)
            fakeRecipe.uiName(`fake_item_out${recipeData.heartOut.indexOf(heartOut)}`, b => b
                .chance(chance)
                .outputItems(
                    Item.of(`splendid_slimes:slime_heart`, heartOut.count, `{slime:{id:"splendid_slimes:${heartOut.id}"}}`).weakNBT()
                )
            )
        }
    }
})

MBDMachineEvents.onBeforeRecipeModify('mbd2:slime_breeder', event => {
    const mbdEvent = event.getEvent()
    const { machine, recipe } = mbdEvent

    // get the slime recipe data for the recipe based on recipe id
    let recipeData = slimeRecipes[recipe.id.toString().split('/').pop()]
    let outputs = recipeData.heartOut
    // calculate total weight from all outputs
    let totalWeight = outputs.reduce((sum, o) => sum + o.weight, 0)
    let rand = Math.random() * totalWeight

    // select a random weighted output
    let selected
    for (const output of outputs) {
        if (rand < output.weight) {
            selected = output
            break
        }
        rand -= output.weight
    }

    // copy the recipe builder then add a slime heart output to it from our random output
    let builder = recipe.copy().toBuilder()
    builder.outputItems(
        Item.of(`splendid_slimes:slime_heart`, selected.count, `{slime:{id:"splendid_slimes:${selected.id}"}}`).weakNBT()
    )
    // overwrite the recipe with our copied builder
    mbdEvent.setRecipe(builder.buildMBDRecipe())
})

MBDMachineEvents.onBeforeRecipeWorking('mbd2:slime_breeder', event => {
    const mbdEvent = event.getEvent()
    const { machine, recipe } = mbdEvent

    // get storage trait for output slot and cancel recipe running if it the slot isn't empty
    // if this isn't cancelled, it'll reroll output chance until it'll output whatever is already in the slot 
    let itemTrait = machine.getTraitByName("item_output_slot")
    /** @type {ItemStackTransfer.prototype} */
    let storage = itemTrait.storage

    if (storage.getStackInSlot(0).count > 0) {
        mbdEvent.setCanceled(true)
    }
})

// ServerEvents.recipes(e => {
//     e.recipes.mbd2.slime_breeding()
//         .inputEntities(
//             [
//                 JsonIO.of(
//                     {
//                         count: 1,
//                         nbt: '{Breed:"splendid_slimes:slimy"}',
//                         value: { entityType: "splendid_slimes:splendid_slime" }
//                     }
//                 )
//             ]
//         )
//         .outputEntities(
//             [
//                 JsonIO.of(
//                     {
//                         count: 1,
//                         nbt: '{Breed:"splendid_slimes:gold"}',
//                         value: { entityType: "splendid_slimes:splendid_slime" }
//                     }
//                 )
//             ]
//         )
// })

// e.recipes.mbd2.slime_breeding()
//     .inputEntities([
//         JsonIO.of(
//             {
//                 count: 1,
//                 nbt: '{Breed:"splendid_slimes:slimy"}',
//                 value: { entityType: "splendid_slimes:splendid_slime" }
//             }
//         ),
//         JsonIO.of(
//             {
//                 count: 1,
//                 nbt: '{Breed:"splendid_slimes:gold"}',
//                 value: { entityType: "splendid_slimes:splendid_slime" }
//             }
//         )
//     ])
//     .outputItems([
//         Item.of('splendid_slimes:slime_heart', { slime: { id: "splendid_slimes:gold" } }).withChance(0.3),
//         Item.of('splendid_slimes:slime_heart', { slime: { id: "splendid_slimes:gold" } }).withChance(0.3)
//     ])
//     .id('kubejs:mbd2/slime_breeder/slimy_gold_to_luminous')