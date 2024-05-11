import { ItemsModel } from '../model/items_model';
import { BagModel } from '../model/bag_model';
import { OrdersModel } from '../model/orders_model';
import { UserModel } from '../model/user_model';
import { ItemsView } from '../view/items_view';
import { BagPreviewView } from '../view/bag-preview.view';
import { OrdersPreviewView } from '../view/orders-preview.view';
import { LocalStorage } from '../localStorage/localStorage';
import { Storage } from '../storage/storage';

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
			this.itemsModel.set(items);
			this.itemsView.renderListItems(items);

			items.forEach(item => {
				const itemIdsLS = JSON.parse(this.localStorage.getToLocalStorage());
				itemIdsLS.forEach(itemIdLS => {
					if (itemIdLS === item.id) {
						this.bagPreviewView.renderBagItem(item);
					}
				});
			});
		});
	}

	handleClickItemBtn = id => {
		this.itemsModel.getItems().forEach(item => {
			if (id !== item.id) {
				return;
			}
			if (this.bagModel.get().includes(item)) {
				return;
			}
			this.bagModel.set(item);
			this.localStorage.set(item);
			this.bagPreviewView.renderBagItem(item);
		});
	};
}
