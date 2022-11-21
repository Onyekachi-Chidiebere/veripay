import sort from '../../images/sort.svg';
import down from '../../images/arrowdown.svg';
import up from '../../images/arrowup.svg';

const SortCaret = (order) => {
  if (!order)
    return (
      <span>
        <img src={sort} alt="sort" style={{ marginLeft: '5px' }} height={15} />
      </span>
    );
  else if (order === 'asc')
    return (
      <span>
        <img src={down} alt="sort" style={{ marginLeft: '5px' }} height={10} />
      </span>
    );
  else if (order === 'desc')
    return (
      <span>
        <img src={up} alt="sort" style={{ marginLeft: '5px' }} height={10} />
      </span>
    );
  return null;
};
export default SortCaret;
