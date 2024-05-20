import { ItemsModel } from '../model/items_model.js';
import { BagModel } from '../model/bag_model.js';
import { OrdersModel } from '../model/orders_model.js';
import { UserModel } from '../model/user_model.js';
import { ItemsView } from '../view/items_view.js';
import { BagPreviewView } from '../view/bag-preview.view.js';
import { OrdersPreviewView } from '../view/orders-preview.view.js';
import { LocalStorage } from '../local-storage/local-storage.js';
import { Storage } from '../firebase/firebase.js';

export class ItemsController {
	constructor() {
		this.itemsModel = new ItemsModel();
		this.bagModel = new BagModel();
		this.ordersModel = new OrdersModel();
		this.userModel = new UserModel();

		this.itemsView = new ItemsView({
			onRenderInBag: this.handleClickItemBtn,
		});
		this.bagPreviewView = new BagPreviewView();
		this.ordersPreviewView = new OrdersPreviewView();

		this.storage = new Storage();

		this.localStorage = new LocalStorage();
	}

	init() {
		this.storage.pull().then(items => {
			if (!items || !items.length) {
				return;
			}

			this.itemsModel.set(items);
			this.itemsView.renderListItems(items);

			items.forEach(item => {
				const basket = this.localStorage.get();

				basket.forEach(itemBasket => {
					if (item.id === itemBasket) {
						this.bagPreviewView.createBagItem(item);
					}
				});
			});
		});
	}

	handleClickItemBtn = (id, btn) => {
		this.itemsModel.getItems().forEach(item => {
			if (id !== item.id) {
				return;
			}

			const basket = this.localStorage.get();
			console.log(basket);

			if (basket.includes(id)) return;

			this.bagModel.set(item);

			basket.push(id);
			this.localStorage.set(basket);

			btn.style.cssText = 'background-color: #47b647;';

			this.bagPreviewView.createBagItem(item);
		});
	};
}
