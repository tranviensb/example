import { DiscountTypeEnum } from '@/type/enum';

export const getTypeAmount = (discountType: DiscountTypeEnum) => {
  switch (discountType) {
    case DiscountTypeEnum.Percentage:
      return '%';
    case DiscountTypeEnum.Value:
      return '$';
    default:
      return '';
  }
};
