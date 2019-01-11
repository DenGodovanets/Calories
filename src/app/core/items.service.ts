import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Item } from '../models/item';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;

  constructor(public afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy('name', 'asc'));
    this.items = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    })

  }

  getItems() {
    return this.items;
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
}

