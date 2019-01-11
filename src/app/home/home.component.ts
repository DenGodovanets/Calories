import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { FirebaseUserModel } from '../core/user.model';
import { ItemsService } from '../core/items.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  items: Item[];
  itemsDrinks: Item[];
  itemsFirst: Item[];
  itemsSecond: Item[];
  itemsDeserts: Item[];
  name: string = '';
  selected: string = '1';
  calories: number;
  productTypes: any = [
    { id: 1, name: 'Drinks' },
    { id: 2, name: 'Soups and salats' },
    { id: 3, name: 'Second courses' },
    { id: 4, name: 'Deserts' }];
  areFieldsText: boolean;
  warningCalories: any;
  summ: any;
  summFromLocal: any;
  yourCaloriesNorm: any;
  yourCalories: number = 2400;
  calculateCalories: any;
  selectedItems: any = [];

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private itemService: ItemsService
  ) {
  }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
      this.itemsDrinks = items.filter(drinks => drinks.type === 'Drinks');
      this.itemsFirst = items.filter(drinks => drinks.type === 'Soups and salats');
      this.itemsSecond = items.filter(drinks => drinks.type === 'Second courses');
      this.itemsDeserts = items.filter(drinks => drinks.type === 'Deserts');
    });
    this.summFromLocal = localStorage.getItem('summ');
    this.selectedItems = JSON.parse(localStorage.getItem('selected'));
  }
  chooseYourNorm() {
    switch (this.yourCaloriesNorm) {
      case "Girl:12-18 years":
        this.yourCalories = 2500;
        break;
      case "Woman:18-65 years":
        this.yourCalories = 2000;
        break;
      case "Boys:12-20 years":
        this.yourCalories = 3000;
        break;
      case "Man:20-65 years":
        this.yourCalories = 2400;
        break;
    }
  }

  addCalories(event: any, item) {
    if (event.target.name === "deleteFood") {
      this.itemService.deleteItem(item);
      return
    };
    this.selectedItems = (JSON.parse(localStorage.getItem('selected')) === null) ? [] :
      JSON.parse(localStorage.getItem('selected'));
    this.selectedItems.push(item);
    localStorage.setItem('selected', JSON.stringify(this.selectedItems));
    this.summFromLocal = localStorage.getItem('summ');
    this.calculateCalories = [this.summFromLocal];
    this.calculateCalories.push(item.calories);
    this.summ = this.calculateCalories.reduce((a, b) => +a + +b, 0);
    localStorage.setItem('summ', this.summ);
    this.summFromLocal = localStorage.getItem('summ');
    if (this.summFromLocal >= this.yourCalories) { this.warningCalories = 'Your calorie intake has been used' }
    else { this.warningCalories = null }
  }

  createNewFood() {
    let calor = this.calories.toString()
    let newArr = this.productTypes.find(item => item.id == this.selected)
    this.itemService.addItem({ calories: calor, name: this.name, type: newArr.name })
  }

  deleteRation() {
    localStorage.removeItem('summ');
    this.summFromLocal = 0;
    this.warningCalories = null;
    this.selectedItems = [];
    localStorage.removeItem('selected')
  }

  removeItem(item) {
    let arr = [...this.selectedItems];
    let findIndexOfRemove = arr.findIndex((e) => e.id == item.id);
    this.selectedItems.splice(findIndexOfRemove, 1);
    this.summ = this.summFromLocal - item.calories;
    localStorage.setItem('summ', this.summ);
    this.summFromLocal = localStorage.getItem('summ');
    localStorage.setItem('selected', JSON.stringify(this.selectedItems));
    if (this.summFromLocal >= this.yourCalories) { this.warningCalories = 'Your calorie intake has been used' }
    else { this.warningCalories = null }
  }
}
