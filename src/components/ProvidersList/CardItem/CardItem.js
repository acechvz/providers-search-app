const CardItem = ({ item, onClick = () => {} }) => (
  <div
    className="p-4 rounded-md shadow-lg hover:shadow-xl transition cursor-pointer flex gap-2 bg-white flex-none w-72 h-20 border-2 border-transparent hover:border-blue-400"
    onClick={onClick}
  >
    <img
      src={item.logo}
      alt=""
      className="rounded-full w-10 h-10 object-cover"
    />
    <h4 className="font-medium text-gray-900 text-xs truncate overflow-ellipsis flex">
      {item.name}
    </h4>
  </div>
);

export default CardItem;
