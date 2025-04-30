import { gsap } from "gsap";
    
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export class Item{
    constructor(payload, card){
        console.log('Item Initialized')

        this.item = payload
        this.card = card

        this.itemHTML = {}

        this.init()
    }

    init = () => {
        this.cacheHTML()
        this.editHTML()
        this.initDraggable()
    }

    cacheHTML = () => {
        this.itemHTML.title = this.card.querySelector('.itemTitle')
        this.itemHTML.image = this.card.querySelector('.itemImage')
        this.itemHTML.date = this.card.querySelector('.itemDate')
        this.itemHTML.location = this.card.querySelector('.itemLocation')
        this.itemHTML.city = this.card.querySelector('.itemCity')
        this.itemHTML.country = this.card.querySelector('.itemCountry')
    }

    editHTML = () => {
        this.itemHTML.image.src = this.item.image_path
        this.itemHTML.title.innerText = this.item.title
        this.itemHTML.date.innerText = this.item.date
        this.itemHTML.city.innerText = this.item.locations.city
        this.itemHTML.country.innerText = this.item.locations.country
    }

    initDraggable = () => {
        Draggable.create(this.card, {
            
        })
    }
}