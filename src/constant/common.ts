import { DiscountTypeEnum } from '@/type/enum';

export const DISCOUNT_TYPE = [
  { label: 'None', value: DiscountTypeEnum.None.toString() },
  { label: '% discount', value: DiscountTypeEnum.Percentage.toString() },
  { label: 'Discount / each', value: DiscountTypeEnum.Value.toString() }
];
