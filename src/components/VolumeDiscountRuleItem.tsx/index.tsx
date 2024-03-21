import { DISCOUNT_TYPE } from '@/constant/common';
import { DeleteIcon } from '@shopify/polaris-icons';
import { DiscountTypeEnum } from '@/type/enum';
import {
  TextField,
  FormLayout,
  Select,
  Button,
  InlineGrid,
  Divider,
  InlineStack
} from '@shopify/polaris';
import { useFormContext, Controller } from 'react-hook-form';
import { getTypeAmount } from '@/utils/common';
import { IVolumeDiscountRuleForm } from '@/type/interface';

type Props = {
  index: number;
  remove: (value: number) => void;
};

const VolumeDiscountRuleItem = ({ index, remove }: Props) => {
  const {
    watch,
    getValues,
    setValue,
    control,
    formState: { errors }
  } = useFormContext<IVolumeDiscountRuleForm>();
  return (
    <div>
      <Divider />
      <InlineStack align="start">
        <div className="bg-orange-600 flex-none max-w-fit rounded-br-md p-1 pr-3">
          <p className="uppercase text-white">{`Option ${index + 1}`}</p>
        </div>
      </InlineStack>
      <InlineStack align="end">
        <Button
          onClick={() => remove(index)}
          variant="plain"
          icon={DeleteIcon}
          accessibilityLabel="Delete option"></Button>
      </InlineStack>
      <FormLayout.Group>
        <InlineGrid gap="400" columns={3}>
          <Controller
            name={`volumeDiscountRules.${index}.title`}
            control={control}
            render={({ field }) => (
              <TextField
                label="Title"
                type="text"
                autoComplete="off"
                placeholder="Input title"
                {...field}
                error={errors?.volumeDiscountRules?.[index]?.title?.message}
              />
            )}
          />
          <Controller
            name={`volumeDiscountRules.${index}.subtitle`}
            control={control}
            render={({ field }) => (
              <TextField
                label="Subtitle"
                type="text"
                autoComplete="off"
                placeholder="Input subtitle"
                {...field}
                error={errors?.volumeDiscountRules?.[index]?.subtitle?.message}
              />
            )}
          />
          <Controller
            name={`volumeDiscountRules.${index}.label`}
            control={control}
            render={({ field }) => (
              <TextField
                label="Label (optional)"
                type="text"
                autoComplete="off"
                placeholder="Input label"
                {...field}
                error={errors?.volumeDiscountRules?.[index]?.label?.message}
              />
            )}
          />
        </InlineGrid>
        <InlineGrid gap="400" columns={3}>
          <Controller
            name={`volumeDiscountRules.${index}.quantity`}
            control={control}
            render={({ field }) => (
              <TextField
                label="Quantity"
                type="number"
                autoComplete="off"
                placeholder="Input quantity"
                min={0}
                {...field}
                value={field.value?.toString()}
                error={errors?.volumeDiscountRules?.[index]?.quantity?.message}
              />
            )}
          />
          <Controller
            name={`volumeDiscountRules.${index}.discountType`}
            control={control}
            render={({ field }) => (
              <Select
                label="Discount type"
                options={DISCOUNT_TYPE}
                {...field}
                value={field.value?.toString()}
                onChange={(value: string) => {
                  setValue(`volumeDiscountRules.${index}.amount`, undefined);
                  field.onChange(Number(value));
                }}
                error={errors?.volumeDiscountRules?.[index]?.discountType?.message}
              />
            )}
          />
          {watch(`volumeDiscountRules.${index}.discountType`) !== DiscountTypeEnum.None && (
            <Controller
              name={`volumeDiscountRules.${index}.amount`}
              control={control}
              render={({ field }) => {
                return (
                  <div className="relative">
                    <TextField
                      label="Amount"
                      type="number"
                      autoComplete="off"
                      placeholder="Input amount"
                      min={0}
                      {...field}
                      value={getValues(`volumeDiscountRules.${index}.amount`)?.toString()}
                      onChange={(value: string) => {
                        if (!value?.toString()) {
                          setValue(`volumeDiscountRules.${index}.amount`, undefined, {
                            shouldValidate: true
                          });
                          return;
                        }
                        field.onChange(value?.toString() ? Number(value) : undefined);
                      }}
                      error={errors?.volumeDiscountRules?.[index]?.amount?.message}
                    />
                    <span className="absolute mt-0.5 top-7 z-[1000] right-7">
                      {getTypeAmount(Number(watch(`volumeDiscountRules.${index}.discountType`)))}
                    </span>
                  </div>
                );
              }}
            />
          )}
        </InlineGrid>
      </FormLayout.Group>
    </div>
  );
};

export default VolumeDiscountRuleItem;
