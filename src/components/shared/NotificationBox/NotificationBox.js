import { faInfoCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Z_INDEX_ELEVATION } from "../../../constants";

const NotificationBox = ({ visible, children, type }) => {
	const renderIcon = () => {
		let iconProps;
		switch (type) {
			case "error":
				iconProps = { icon: faTimesCircle, className: "text-red-500" };
				break;
			default:
				iconProps = { icon: faInfoCircle, className: "text-blue-500" };
				break;
		}

		return <FontAwesomeIcon {...iconProps} />;
	};

	const notificationClasses = () => {
		return classNames(
			"transform fixed bottom-0 left-0 mb-2 mx-2 inset-x-auto bg-white shadow-md rounded-md max-w-lg transition p-3 flex gap-2 text-sm text-gray-600 font-medium",
			{
				"translate-x-0": visible,
				"-translate-x-full opacity-0": !visible,
			}
		);
	};

	return (
		visible && (
			<div
				className={notificationClasses()}
				style={{ zIndex: Z_INDEX_ELEVATION.UPFRONT }}
			>
				<span>{renderIcon()}</span>
				<div className="flex-auto">{children}</div>
			</div>
		)
	);
};

export default NotificationBox;
