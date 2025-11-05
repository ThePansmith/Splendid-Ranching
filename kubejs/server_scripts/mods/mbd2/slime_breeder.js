const slimeRecipes = {
    // recipe id, example recipe object
    placeholder: {
        // an input catalyst item that gets consumed when the recipe is ran (Optional, max 1)
        itemIn: { item: Item.of('minecraft:glowstone_dust'), chance: 0.05 },
        // an output slime entity (Optional, max 1)
        entityOut: { count: 1, id: 'all_seeing', chance: 0.2 },
        // required slime entity inputs (Required > 0, recommend 2+, max 3)
        entityIn: [{ count: 1, id: 'slimy' }, { count: 1, id: 'bony' }, { count: 1, id: 'rotting' }],
        // output slime hearts (Required > 0, required weight, max 3)
        heartOut: [{ count: 1, id: 'bony', weight: 6 }, { count: 1, id: 'rotting', weight: 7 }, { count: 1, id: 'all_seeing', weight: 2 }]
    },
    slimy_gold_to_luminous: {
        entityIn: [{ count: 1, id: 'slimy' }, { count: 1, id: 'gold' }],
        heartOut: [{ count: 1, id: 'slimy', weight: 4 }, { count: 1, id: 'gold', weight: 5 }, { count: 1, id: 'luminous', weight: 1 }]
    }
}
// delete slimeRecipes.placeholder // functions if you comment this for testing, uncomment for release

ServerEvents.recipes(e => {
    for (const [recipeName, recipeData] of Object.entries(slimeRecipes)) {
        //  - - real recipes that function in slime breeder machine - -
        // probably hide this recipe category from recipe viewer on release, since fake recipe will be used for display
        let recipe = e.recipes.mbd2.slime_breeding()
            // real recipe entity input
            .inputEntities(
                recipeData.entityIn.map(input => JsonIO.of({
                    count: input.count,
                    nbt: `{Breed:"splendid_slimes:${input.id}"}`,
                    value: { entityType: "splendid_slimes:splendid_slime" }
                }))
            )
            .id(`kubejs:mbd2/slime_breeder/real/${recipeName}`)
        // real recipe entity output
        if (recipeData.entityOut) {
            recipe.outputEntities(
                JsonIO.of({
                    count: recipeData.entityOut.count,
                    nbt: `{Breed:"splendid_slimes:${recipeData.entityOut.id}"}`,
                    value: { entityType: "splendid_slimes:splendid_slime" }
                })
            )
        }
        // real recipe item input
        if (recipeData.itemIn) {
            if (recipeData.itemIn.chance) recipe.chance(recipeData.itemIn.chance)
            recipe.inputItems(recipeData.itemIn.item)
        }
        // - - fake recipe for recipe viewer displaying nicely, doesn't function - -
        let fakeRecipe = e.recipes.mbd2.fake_slime_breeding()
            .id(`kubejs:mbd2/slime_breeder/fake/${recipeName}`)
            .inputEntities(
                recipeData.entityIn.map(input => JsonIO.of({
                    count: input.count,
                    nbt: `{Breed:"splendid_slimes:${input.id}"}`,
                    value: { entityType: "splendid_slimes:splendid_slime" }
                }))
            )
        // fake recipe entity output
        if (recipeData.entityOut) {
            // fake entity output display
            if (recipeData.entityOut.chance) {
                fakeRecipe.chance(recipeData.entityOut.chance)
            }
            fakeRecipe.outputEntities(
                JsonIO.of({
                    count: recipeData.entityOut.count,
                    nbt: `{Breed:"splendid_slimes:${recipeData.entityOut.id}"}`,
                    value: { entityType: "splendid_slimes:splendid_slime" }
                })
            )
            // fake entity output item display
            fakeRecipe.uiName(`entity_item_out0`, b => b
                .outputItems(
                    Item.of(`splendid_slimes:slime_item`, recipeData.entityOut.count,
                        `{slime:{id:"splendid_slimes:${recipeData.entityOut.id}"}}`).weakNBT()
                )
            )
            fakeRecipe.chance(1) // reset chance for next recipe component
        }
        // fake recipe item input
        if (recipeData.itemIn) {
            fakeRecipe.uiName(`item_in0`, b => {
                if (recipeData.itemIn.chance) {
                    b.chance(recipeData.itemIn.chance)
                } else {
                    b.inputItems(recipeData.itemIn.item)
                }
                b.chance(1) // reset chance for next recipe component
            })
        }
        // fake recipe slime item inputs
        for (const entityIn of recipeData.entityIn) {
            fakeRecipe.uiName(`entity_item_in${recipeData.entityIn.indexOf(entityIn)}`, b => b
                .chance(1) // reset chance for next recipe component
                .inputItems(Item.of(`splendid_slimes:slime_item`, entityIn.count, `{slime:{id:"splendid_slimes:${entityIn.id}"}}`).weakNBT())
            )
        }
        // fake recipe slime heart item outputs
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