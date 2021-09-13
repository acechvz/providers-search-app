import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const List = ({ children, className, ...listProps }) => {
  return (
    <div className={`${className}`} {...listProps}>
      <div className="absolute bottom-0 left-0 w-full h-16 z-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      {children}
    </div>
  );
};

List.Item = ({ children, checked, onClick }) => (
  <div
    className="flex gap-2 items-center cursor-pointer mb-1"
    onClick={onClick}
  >
    <span className="w-4 h-4 shadow-sm border-2 border-gray-300 flex items-center justify-center rounded-sm">
      {checked && (
        <FontAwesomeIcon icon={faCheck} size="xs" className="text-blue-600" />
      )}
    </span>
    {children}
  </div>
);

List.Scrollable = ({ children }) => (
  <div className="max-h-60 overflow-scroll pb-2 ">{children}</div>
);
export default List;
