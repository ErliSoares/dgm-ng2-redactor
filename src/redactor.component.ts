/// <reference path="./index.d.ts" />
import {
	Component,
	forwardRef,
	ElementRef,
	ViewChild,
	Renderer,
	ViewEncapsulation,
	Input,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'
import 'imports?jQuery=jquery!redactorLib'
import 'imports?jQuery=jquery!redactorSource'
import * as $ from 'jquery'

const RedactorValueAccessor = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => Redactor),
	multi: true,
}

@Component({
	selector: '[redactor]',
	providers: [RedactorValueAccessor],
	templateUrl: './redactor.component.jade',
	encapsulation: ViewEncapsulation.None,
})
export class Redactor implements ControlValueAccessor {
	@Input() minHeight: number
	@Input() enableSource = true
	private _onChange: Function
	private _onTouched: Function
	@ViewChild('content')
	private content: ElementRef
	private _value

	constructor(
		private host: ElementRef,
		private renderer: Renderer
	) {}

	ngAfterViewInit() {
		if (!this.content) {
			throw 'Redactor: No content child'
		}

		let elem = this.content.nativeElement as HTMLTextAreaElement
		elem.value = this._value
		const { _onChange } = this

		const plugins = [
			this.enableSource ? 'source' : undefined,
		].filter(it => !!it)
		$(elem).redactor({
			plugins,
			minHeight: +this.minHeight,
			callbacks: {
				change: function redactorOnChange() {
					_onChange(this.code.get())
				},
			},
		})
	}

	writeValue(value) {
		this._value = value
	}

	registerOnChange(fn) {
		this._onChange = fn
	}

	registerOnTouched(fn) {
		this._onTouched = fn
	}
}
