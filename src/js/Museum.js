import { createClient } from "@supabase/supabase-js"
import { Item } from "./Item"

export class Museum{
    constructor(){
        console.log('Museum Initialized')

        this.supabaseUrl = 'https://ywyajigbvwupvusgujoc.supabase.co'
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3eWFqaWdidnd1cHZ1c2d1am9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTYwMzMsImV4cCI6MjA2MTQ5MjAzM30.22fC8mHg7-6hBF_KcTzPMQgZZ68y8UZ9Bo8k5dCbQmc'

        this.init()
    }

    init = () => {
        this.initSupabase()
        this.getItems()
        this.cacheDOM()
    }

    initSupabase = () => {
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey)
    }

    getItems = async () => {
        const datas = await this.supabase.from('items').select('*, locations (country, city)')

        datas.data.forEach(e => {
            const itemTemplateClone = this.itemTemplate.cloneNode(true)
            const item = new Item(e, itemTemplateClone)
            this.displayItem(item.card)
        });
    }

    displayItem = (html) => {
        this.map.appendChild(html)
    }

    cacheDOM = () => {
        this.itemTemplate = document.querySelector('.item')
        this.itemTemplate.remove()
        this.map = document.querySelector('#map')
    }
}