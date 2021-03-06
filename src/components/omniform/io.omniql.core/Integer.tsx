import * as React from "react";
import { FormText, Label, Input, FormGroup, FormFeedback } from "reactstrap";
import HelpButton from "../../HelpButton/HelpButton";
import { FormField, IRendererProps, ValidationState, IRenderer} from '../base';
let styles = require('./Integer.scss');

export interface IIntegerTheme {
	formGroup?: string;
	label?: string;
	input?: string;
	feedback?: string;
	requiredSymbol?: string;
	shortHelp?: string;
}

const Integer: IRenderer<number> = (props: IRendererProps<number>) => {
	let stateColor;
	let field = props.field;
	let theme = props.theme;

	switch (field.valid) {
		case ValidationState.INVALID:
			stateColor = 'danger';
			break;
		case ValidationState.VALID:
			stateColor = 'success';
			break;

		default:
			stateColor = '';
	}

	return (
		<FormGroup color={stateColor} className={theme.formGroup} disabled={field.disabled}>
			<Label for={field.id} className={theme.label}>{field.label} &nbsp;</Label>
			{field.help && field.help.long ? <HelpButton content={field.help.long} /> : null}
			{field.required ? <span className={theme.requiredSymbol}>●</span> : null}
			<Input
				state={stateColor}
				type="number"
				placeholder={field.placeholder}
				value={field.value}
				onChange={(evt: any) => { field.on.change(evt.target.value) }}
				onBlur={(evt: any) => { field.on.validate() }}
				className={theme.input}
				disabled={field.disabled}
				id={field.id} />
			{field.error ?
				<FormFeedback className={theme.feedback}>{field.error}</FormFeedback> : null}
			{field.help && field.help.short ?
				<FormText color="muted" className={theme.shortHelp}>{field.help.short}</FormText> : null}
		</FormGroup>
	);
};

Integer.defaultProps = {
	theme: styles,
};

Integer.displayName = "Integer";

export default Integer;