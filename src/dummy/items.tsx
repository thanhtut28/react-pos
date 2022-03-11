enum Size {
   small = 'S',
   medium = 'M',
   large = 'L',
}

enum ItemType {
   waterBottle = 'waterBottle',
   snack = 'snack',
}

const CODES = {
   ALP: 'ALP',
   DSW: 'DSW',
   OIS: 'OIS',
   CRC: 'CRC',
   CHOB: 'CHOB',
}

export interface TypeItem {
   title: string
   price: number
   type: ItemType
   code: string
   size: Size
   amount: number
}

export const items: TypeItem[] = [
   {
      title: 'Alpine',
      price: 500,
      type: ItemType.waterBottle,
      code: CODES.ALP,
      size: Size.medium,
      amount: 5,
   },

   {
      title: 'Design Water',
      price: 6500,
      type: ItemType.waterBottle,
      code: CODES.DSW,
      size: Size.large,
      amount: 3,
   },
   {
      title: 'Oishi',
      price: 400,
      type: ItemType.snack,
      code: CODES.OIS,
      size: Size.large,
      amount: 4,
   },
   {
      title: 'Crispy Chips',
      price: 200,
      type: ItemType.snack,
      code: CODES.CRC,
      size: Size.small,
      amount: 7,
   },
   // {
   //    title: 'Choco Bite',
   //    price: 400,
   //    type: ItemType.snack,
   //    code: CODES.CHOB,
   //    size: Size.large,
   //    amount: 6,
   // },
]
