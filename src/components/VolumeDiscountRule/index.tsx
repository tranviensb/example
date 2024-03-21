import { PlusCircleIcon } from '@shopify/polaris-icons';
import { DiscountTypeEnum } from '@/type/enum';
import { IVolumeDiscountRuleForm } from '@/type/interface';
import { LegacyCard, FormLayout, Button, Divider } from '@shopify/polaris';
import { useFormContext, useFieldArray } from 'react-hook-form';
import VolumeDiscountRuleItem from '../VolumeDiscountRuleItem.tsx';

const VolumeDiscountRule = () => {
  const { watch, control } = useFormContext<IVolumeDiscountRuleForm>();

  const [volumeDiscountRules] = watch(['volumeDiscountRules']);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'volumeDiscountRules'
  });

  const handleAddOption = () => {
    const discountRule = {
      title: '',
      subtitle: '',
      label: '',
      amount: undefined,
      quantity: 1,
      discountType: DiscountTypeEnum.None
    };
    if (volumeDiscountRules?.length) {
      const lastOption = volumeDiscountRules[volumeDiscountRules?.length - 1];
      append({
        ...discountRule,
        quantity: Number(lastOption?.quantity || 0) + 1,
        discountType: DiscountTypeEnum.None
      });
      return;
    }
    append({
      ...discountRule
    });
  };

  return (
    <LegacyCard title="Volume discount rule" sectioned>
      <FormLayout>
        {fields.map((discountRuler, index) => {
          return <VolumeDiscountRuleItem key={discountRuler.id} index={index} remove={remove} />;
        })}
        <Divider />
        <Button icon={PlusCircleIcon} onClick={handleAddOption} fullWidth>
          Add option
        </Button>
      </FormLayout>
    </LegacyCard>
  );
};

export default VolumeDiscountRule;
