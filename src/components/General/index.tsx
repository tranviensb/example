import { IVolumeDiscountRuleForm } from '@/type/interface';
import { LegacyCard, TextField, FormLayout } from '@shopify/polaris';
import { useFormContext, Controller } from 'react-hook-form';

const General = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext<IVolumeDiscountRuleForm>();
  return (
    <LegacyCard title="General" sectioned>
      <FormLayout>
        <Controller
          name={'campaign'}
          control={control}
          render={({ field }) => (
            <TextField
              label="Campaign"
              type="text"
              autoComplete="off"
              placeholder="Input campaign"
              {...field}
              error={errors?.campaign?.message}
            />
          )}
        />
        <Controller
          name={'title'}
          control={control}
          render={({ field }) => (
            <TextField
              label="Title"
              type="text"
              autoComplete="off"
              placeholder="Input title"
              {...field}
              error={errors?.title?.message}
            />
          )}
        />
        <Controller
          name={'description'}
          control={control}
          render={({ field }) => (
            <TextField
              label="Description"
              type="text"
              autoComplete="off"
              placeholder="Input description"
              {...field}
              error={errors?.description?.message}
            />
          )}
        />
      </FormLayout>
    </LegacyCard>
  );
};

export default General;
