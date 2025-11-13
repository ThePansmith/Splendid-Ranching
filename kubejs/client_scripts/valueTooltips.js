let slimeData = {}

NetworkEvents.dataReceived('kubejs:slime_value_data', e => {
    slimeData = e.data
})

// Plort dynamic valuing tooltips
ItemEvents.tooltip(e => {
    e.addAdvanced(`splendid_slimes:plort`, (item, advanced, text) => {
        try {
            if (!item.nbt || !item.nbt['plort']) return // return if plort item has no nbt (base item)
            text.remove(1) // remove the default "from fed slimes" tool tip

            let plort = item.nbt['plort'].id.split(':')[1] // get plort breed

            if (slimeData && slimeData[plort] === undefined) return // return if plort breed has no data entry

            let plortData = slimeData[plort]
            let cost = plortData.currentValue
            let mult = plortData.multPercent

            text.add(text.length, [
                `§6${global.calculateCost(cost, 1, 1)}§a☻`,
            ])
            if (item.count > 1) {
                text.add(text.length, [
                    `§7Stack Value: §6${global.calculateCost(cost, 1, item.count)}§a☻`
                ])
            }
            if (mult != 0 && mult != undefined) {
                text.add(text.length, [
                    `${mult < 0 ? '§c' : '§a+'}${mult}%`
                ])
            }

            if (e.ctrl) { // show all plort data on ctrl (For debug mostly)
                let plortDataArr = Object.entries(plortData)
                for (let [key, val] of plortDataArr) {
                    text.add(3 + plortDataArr.indexOf(key), [
                        `${key}: §6${val}`
                    ])
                }
            }
        } catch (err) {
            console.log(err)
        }
    })
})

// Coin valuing tooltips
ItemEvents.tooltip(e => {
    for (let coinEntry of Object.entries(global.coinObj)) {
        e.addAdvanced(coinEntry[0], (item, advanced, text) => {
            text.remove(1)
            let val = global.coinObj[item.id]
            if (e.shift) {
                text.add(1, [
                    `§6${global.calculateCost(val, 1, item.count)}§a☻`,
                    item.count > 1 ? '§7 Stack Value' : ''
                ])
            } else {
                text.add(1, [
                    `§6${global.calculateCost(val, 1, 1)}§a☻`,
                    item.count > 1 ? '§8 [§7Shift§8]' : ''
                ])
            }
        })
    }
})
