export class LocalStorage {
	constructor() {
		this.userId = [];
		this.itemsIds = [];
	}

	set(item) {
		this.itemsIds.push(item.id);

		localStorage.setItem('items', JSON.stringify(this.itemsIds));
	}

	setToLocalStorage() {}

	getToLocalStorage() {
		const itemsIds = localStorage.getItem('items', this.itemsIds);
		return itemsIds;
	}
}
