import { DateTime } from "luxon"

export class Event {
    id: number
    eventName: string = ""
    eventDate: string = ""
    eventTime: string = ""
    eventDateTime: DateTime
    constructor(id: number) {
        this.id = id

        let date = DateTime.now()
        date = date.set({ second: 0, millisecond: 0 })
        this.eventDateTime = date
    }
}
