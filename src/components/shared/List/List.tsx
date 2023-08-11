import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HTMLAttributes } from "react";

interface ListProps extends HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

const List = ({ children, className, ...restProps }: ListProps) => {
	return (
		<div className={`${className}`} {...restProps}>
			<div className="absolute bottom-0 left-0 w-full h-16 z-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
			{children}
		</div>
	);
};

interface ListItemProps {
	children: React.ReactNode;
	isChecked?: boolean;
	onClick?: () => void;
}

List.Item = ({ children, isChecked = false, onClick }: ListItemProps) => (
	<div
		className="flex gap-2 items-center cursor-pointer mb-1"
		onClick={onClick}
	>
		<span className="w-4 h-4 shadow-sm border-2 border-gray-300 flex items-center justify-center rounded-sm">
			{isChecked && (
				<FontAwesomeIcon
					icon={faCheck}
					size="xs"
					className="text-blue-600"
				/>
			)}
		</span>
		{children}
	</div>
);

interface ListScrollableProps {
	children: React.ReactNode;
}

List.Scrollable = ({ children }: ListScrollableProps) => (
	<div className="max-h-60 overflow-scroll pb-2">{children}</div>
);

export default List;
