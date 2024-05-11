import { BagModel } from '../model/bag_model';
import { BagView } from '../view/bag.view';
import { Storage } from '../storage/storage';
import { LocalStorage } from '../localStorage/localStorage';

export class BagController {
	constructor() {
		this.bagModel = new BagModel();
		this.bagView = new BagView();
		this.storage = new Storage();
		this.localStorage = new LocalStorage();
	}

	init() {
		this.storage.pull().then(items => {
			items.forEach(item => {
				const itemsIdsLS = JSON.parse(this.localStorage.getToLocalStorage());

				itemsIdsLS.forEach(itemFromLS => {
					if (item.id === itemFromLS) {
						console.log(item);

						this.bagView.renderBagItem(item);
					}
				});
			});
		});
	}
}
