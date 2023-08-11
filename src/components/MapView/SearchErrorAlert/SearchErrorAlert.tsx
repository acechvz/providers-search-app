import {
	NotificationBox,
	NotificationBoxVariant,
} from "../../shared/NotificationBox/NotificationBox";

interface SearchErrorAlertProps {
	content: string;
}

export const SearchErrorAlert = ({ content }: SearchErrorAlertProps) => {
	if (!content) return null;

	return (
		<NotificationBox isVisible variant={NotificationBoxVariant.Error}>
			{content}
		</NotificationBox>
	);
};
