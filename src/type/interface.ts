import { DiscountTypeEnum } from './enum';

export interface IVolumeDiscountRule {
  title?: string;
  subtitle?: string;
  label?: string;
  quantity?: number;
  discountType?: DiscountTypeEnum;
  amount?: number;
}

export interface IVolumeDiscountRuleForm {
  campaign: string;
  title?: string;
  description?: string;
  volumeDiscountRules?: IVolumeDiscountRule[];
}
