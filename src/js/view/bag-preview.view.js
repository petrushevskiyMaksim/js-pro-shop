export class BagPreviewView {
	constructor() {
		this.itemsBagListNode = document.getElementById('bagList');
	}

	renderBagItem(item) {
		const li = document.createElement('li');
		li.classList.add('bag__item');

		const link = document.createElement('a');
		link.classList.add('bag__link');
		link.href = `./pages/card-product.html?id=${item.id}`;

		const img = document.createElement('img');
		img.classList.add('bag__img');
		img.src = item.imageURL;
		img.alt = 'картинка из корзины';

		link.append(img);

		li.append(link);

		this.itemsBagListNode.append(li);
	}
}
