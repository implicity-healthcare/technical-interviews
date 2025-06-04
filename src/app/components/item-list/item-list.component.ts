import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].quality > 0) {
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
              this.items[i].quality = this.items[i].quality - 1
            }
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  private gildedRose: GildedRose;
  
  newItemName = '';
  newItemSellIn = 0;
  newItemQuality = 0;
  showAddForm = false;

  constructor() {
    const initialItems = [
      new Item('+5 Dexterity Vest', 10, 20),
      new Item('Aged Brie', 2, 0),
      new Item('Elixir of the Mongoose', 5, 7),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Sulfuras, Hand of Ragnaros', -1, 80),
      new Item('Conjured Mana Cake', 3, 6)
    ];

    this.gildedRose = new GildedRose(initialItems);
    this.items = [...this.gildedRose.items];
  }

  ngOnInit(): void {
  }

  updateQuality(): void {
    this.gildedRose.updateQuality();
    this.items = [...this.gildedRose.items];
  }

  addItem(): void {
    if (this.newItemName.trim()) {
      const newItem = new Item(this.newItemName.trim(), this.newItemSellIn, this.newItemQuality);
      this.gildedRose.items.push(newItem);
      this.items = [...this.gildedRose.items];
      this.resetForm();
    }
  }

  removeItem(index: number): void {
    if (index >= 0 && index < this.gildedRose.items.length) {
      this.gildedRose.items.splice(index, 1);
      this.items = [...this.gildedRose.items];
    }
  }

  resetItems(): void {
    const initialItems = [
      new Item('+5 Dexterity Vest', 10, 20),
      new Item('Aged Brie', 2, 0),
      new Item('Elixir of the Mongoose', 5, 7),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Sulfuras, Hand of Ragnaros', -1, 80),
      new Item('Conjured Mana Cake', 3, 6)
    ];

    this.gildedRose = new GildedRose(initialItems);
    this.items = [...this.gildedRose.items];
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.newItemName = '';
    this.newItemSellIn = 0;
    this.newItemQuality = 0;
    this.showAddForm = false;
  }

  getItemTypeClass(itemName: string): string {
    if (itemName.includes('Sulfuras')) {
      return 'legendary';
    } else if (itemName.includes('Aged Brie')) {
      return 'aged-brie';
    } else if (itemName.includes('Conjured')) {
      return 'conjured';
    }
    return 'normal';
  }

  getItemTypeDisplay(itemName: string): string {
    if (itemName.includes('Sulfuras')) {
      return 'Legendary';
    } else if (itemName.includes('Aged Brie')) {
      return 'Aged Brie';
    } else if (itemName.includes('Conjured')) {
      return 'Conjured';
    }
    return 'Normal';
  }
} 