import Loading from '@/components/atoms/loading.vue';

export default {
  title: 'Atoms/Loading',
  component: Loading,
};

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Loading },
  template: '<loading />',
});

export const Default = Template.bind({});
