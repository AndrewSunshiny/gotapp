export default class GotService {
	constructor() {
		this._apiBase = "https://www.anapioficeandfire.com/api/";
	}

	getResource = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};

	getAllCharacters = async () => {
		const res = await this.getResource(`characters?page=5&pageSize=10`);
		return res.map(this._transformCharacter);
	};

	getCharacter = async (id) => {
		const res = await this.getResource(`characters/${id}`);
		return this._transformCharacter(res);
	};

	getAllHouses = async () => {
		const res = await this.getResource(`houses`);
		return res.map(this._transformHouse);
	};

	getHouse = async (id) => {
		const res = await this.getResource(`houses/${id}`);
		return this._transformHouse(res);
	};

	getAllBooks = async () => {
		const res = await this.getResource(`books`);
		return res.map(this._transformBook);
	};

	getBook = async (id) => {
		const res = await this.getResource(`books/${id}`);
		return this._transformBook(res);
	};

	isSet(data) {
		if (data) {
			return data;
		} else {
			return "no data :(";
		}
	}

	_extractId = (item) => {
		const idRegExp = /\/([0-9]*)$/;
		return item.url.match(idRegExp)[1];
	};

	_transformCharacter = (char) => {
		return {
			id: this._extractId(char),
			name: char.name,
			gender: char.gender,
			born: char.born,
			died: char.died,
			culture: char.culture,
		};
	};

	_transformHouse = (house) => {
		return {
			id: this._extractId(house),
			name: house.name,
			region: house.region,
			words: house.words,
			titles: house.titles,
			ocerlord: house.ocerlord,
			ancestralWeapons: house.ancestralWeapons,
		};
	};

	_transformBook = (book) => {
		return {
			id: this._extractId(book),
			name: book.name,
			numberOfPages: book.numberOfPages,
			publisher: book.publisher,
			released: book.released,
		};
	};
}
