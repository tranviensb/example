import General from '@/components/General';
import Preview from '@/components/Preview';
import VolumeDiscountRule from '@/components/VolumeDiscountRule';
import { DiscountTypeEnum } from '@/type/enum';
import { IVolumeDiscountRuleForm } from '@/type/interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { Page, Grid, Button } from '@shopify/polaris';
import { error } from 'console';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

const Index = () => {
  const schema = yup.object().shape({
    campaign: yup.string().required('This field is required.'),
    title: yup.string().nullable(),
    description: yup.string().nullable(),
    volumeDiscountRules: yup
      .array()
      .of(
        yup.object().shape({
          title: yup.string().nullable().required('This field is required.'),
          subtitle: yup.string(),
          label: yup.string(),
          quantity: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? undefined : Number(value)))
            .required('This field is required.'),
          discountType: yup.string(),
          amount: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? undefined : Number(value)))
            .when('discountType', {
              is: (value: DiscountTypeEnum) =>
                value?.toString() === DiscountTypeEnum.None?.toString(),
              then: yup.number().nullable(),
              otherwise: yup.number().required('This field is required.').nullable()
            })
        })
      )
      .min(1, 'This field is required.')
      .required('This field is required.')
  });

  const methods = useForm<IVolumeDiscountRuleForm>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      volumeDiscountRules: [
        {
          title: 'Single',
          subtitle: 'Standard',
          label: '',
          quantity: 1,
          discountType: DiscountTypeEnum.None
        },
        {
          title: 'Duo',
          subtitle: 'Save 10%',
          label: 'Popular',
          quantity: 2,
          discountType: DiscountTypeEnum.Percentage,
          amount: 10
        }
      ]
    }
  });

  return (
    <FormProvider {...methods}>
      <Page
        backAction={{ content: 'Home', url: '#' }}
        title="Create volume discount"
        primaryAction={
          <Button
            onClick={methods.handleSubmit(
              () => alert('Complete!'),
              (error) => {
                if (error.volumeDiscountRules?.message) {
                  alert('Please add option rule');
                }
              }
            )}>
            Save
          </Button>
        }>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 5, sm: 5, md: 5, lg: 7, xl: 7 }}>
            <General />
            <VolumeDiscountRule />
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 5, xl: 5 }}>
            <Preview />
          </Grid.Cell>
        </Grid>
      </Page>
    </FormProvider>
  );
};

export default Index;
