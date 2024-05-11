export class BagModel {
	constructor() {
		this.itemsBag = [];
	}

	set(item) {
		this.itemsBag.push(item);
	}

	get() {
		// console.log(this.itemsBag);
		return this.itemsBag;
	}
}
