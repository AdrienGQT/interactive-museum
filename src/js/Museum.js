import { createClient } from "@supabase/supabase-js"

export class Museum{
    constructor(){
        console.log('new Museum')

        this.supabaseUrl = 'https://ywyajigbvwupvusgujoc.supabase.co'
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3eWFqaWdidnd1cHZ1c2d1am9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTYwMzMsImV4cCI6MjA2MTQ5MjAzM30.22fC8mHg7-6hBF_KcTzPMQgZZ68y8UZ9Bo8k5dCbQmc'

        this.init()
    }

    init = () => {
        this.initSupabase()
    }

    initSupabase = () => {
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey)
    }
}