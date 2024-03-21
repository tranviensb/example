import { DISCOUNT_TYPE } from '@/constant/common';
import { IVolumeDiscountRuleForm } from '@/type/interface';
import { getTypeAmount } from '@/utils/common';
import { BlockStack, DataTable, LegacyCard, Text } from '@shopify/polaris';
import { useFormContext } from 'react-hook-form';

const Preview = () => {
  const { watch } = useFormContext<IVolumeDiscountRuleForm>();

  const [volumeDiscountRules] = watch(['volumeDiscountRules']);

  const discountRulerData = volumeDiscountRules?.map((item) => {
    const discountTypeData = DISCOUNT_TYPE.find(
      (discountType) => discountType.value === item?.discountType?.toString()
    );
    return [
      item.title,
      discountTypeData?.label,
      item.quantity,
      item.amount?.toString()
        ? `${item.amount} ${getTypeAmount(Number(item?.discountType))}`
        : undefined
    ];
  });

  return (
    <LegacyCard title="Preview" sectioned>
      <BlockStack gap="300">
        <Text as="h3" alignment="center" variant="headingLg">
          Buy more and save
        </Text>
        <Text fontWeight="medium" as="h1" variant="headingXs">
          Apply for all products in store
        </Text>
        <DataTable
          columnContentTypes={['text', 'text', 'numeric', 'text']}
          headings={['Title', 'Discount Type', 'Quantity', 'Amount']}
          rows={discountRulerData || []}
        />
      </BlockStack>
    </LegacyCard>
  );
};

export default Preview;
