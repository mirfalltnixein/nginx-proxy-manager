import { Formik, type FormikConfig, type FormikProps, type FormikValues } from "formik";
import type { ReactNode } from "react";
import Modal from "react-bootstrap/Modal";
import { intl } from "src/locale";

interface FormModalProps<Values extends FormikValues> extends Omit<FormikConfig<Values>, "children"> {
	show: boolean;
	onHide: () => void;
	children: (props: FormikProps<Values> & { onHide: () => void }) => ReactNode;
}

const FormModal = <Values extends FormikValues>({ show, onHide, children, ...formikProps }: FormModalProps<Values>) => (
	<Formik {...formikProps}>
		{(formikProps) => {
			const handleHide = () => {
				if (
					!formikProps.dirty ||
					window.confirm(
						intl.formatMessage({
							id: "form.unsaved-changes",
							defaultMessage: "You have unsaved changes. Are you sure you want to discard them?",
						}),
					)
				) {
					onHide();
				}
			};

			return (
				<Modal show={show} onHide={handleHide}>
					{children({ ...formikProps, onHide: handleHide })}
				</Modal>
			);
		}}
	</Formik>
);

export { FormModal };
