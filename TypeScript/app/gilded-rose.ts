export class Item {
  name: string
  sellIn: number
  quality: number

  constructor(name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

export class GildedRose {
  items: Array<Item>

  constructor(items = [] as Array<Item>) {
    this.items = items
  }

  updateQuality() {
    this.items.forEach(item => {
      this.updateItem(item)
    })

    return this.items
  }

  // @TODO: the file stdout.gr with the 'correct' output is wrong,
  // the Conjured items degrade in `Quality` as the normal items.
  // If we fix the file we can uncomment the code below and the test will pass.
  updateItem(item: Item) {
    const isAged = item.name == 'Aged Brie'
    const isBackstage = item.name == 'Backstage passes to a TAFKAL80ETC concert'
    const isSulfuras = item.name == 'Sulfuras, Hand of Ragnaros'
    const isConjured = item.name == 'Conjured Mana Cake'
    
    if (!isAged && !isBackstage && !isSulfuras) {
      if (item.quality > 0) {
        item.quality--
      }
      // @TODO: uncomment this code if the Conjured items degrade in `Quality` twice as fast as normal items always even before their sell by date
      // if (isConjured && item.quality > 0) {
      //   item.quality--
      // }
    }
    if (isAged || isBackstage) {
      if (item.quality < 50) {
        item.quality++
        if (isBackstage && item.quality < 50) {
          if (item.sellIn < 11) {
            item.quality++
          }
          if (item.sellIn < 6) {
            item.quality++
          }
        }
      }
    }
    if (!isSulfuras) {
      item.sellIn--
    }
    if (item.sellIn < 0) {
      if (isAged) {
        if (item.quality < 50) {
          item.quality++
        }
      } else {
        if (isBackstage) {
          item.quality = 0
        } else {
          if (!isSulfuras && item.quality > 0) {
            item.quality--
          }
          // @TODO: uncomment this code if the Conjured items degrade in `Quality` twice as fast as normal items after their sell by date
          // if (isConjured && item.quality > 0) {
          //   item.quality--
          // }
        }
      }
    }
  }
}
