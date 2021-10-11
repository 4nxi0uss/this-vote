export interface dataTypes {
    fields: [...{
      name: string
    }[]],
    rows: [{
      Id: number,
      bus_number: number,
      departure_time: string,
      destination: string
    }
    ]
  }