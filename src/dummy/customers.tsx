export interface CustomerInterface {
   name: string
   code: string
   credit: number
   expiryDate: Date
}

export const customers: CustomerInterface[] = [
   {
      name: 'Bright Mini Store',
      code: 'BMS',
      credit: 500000,
      expiryDate: new Date('February 17, 2022 03:24:00'),
   },
   {
      name: 'AYT Store',
      code: 'AYT',
      credit: 10000,
      expiryDate: new Date('February 21, 2022 03:24:00'),
   },
   {
      name: 'U Hla Mg',
      code: 'UHM',
      credit: 10000,
      expiryDate: new Date('February 14, 2022 03:24:00'),
   },
   {
      name: 'Shwe Taung Group Myanmar',
      code: 'STGM',
      credit: 10000000,
      expiryDate: new Date('February 1, 2022 03:24:00'),
   },
]
