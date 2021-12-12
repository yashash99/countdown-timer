import { DateTime } from "luxon"

export class Event {
    eventName: string = ""
    eventDate: string = ""
    eventTime: string = ""
    eventDateTime: DateTime
    constructor() {
        let date = DateTime.now()
        date = date.set({ second: 0, millisecond: 0 })
        this.eventDateTime = date
    }
}
