import { Header } from '../../components';

const Base = (props: any) => {
  const { children } = props;
  
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Base;
