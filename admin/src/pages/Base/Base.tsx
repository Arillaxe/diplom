import { Header } from '../../components';

const Base = (props: any) => {
  const { children, renderMore, renderPagination } = props;
  
  return (
    <div>
      <Header renderMore={renderMore} renderPagination={renderPagination} />
      <div style={{ marginTop: '71px' }}>{children}</div>
    </div>
  );
};

export default Base;
