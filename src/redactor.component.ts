import {
	Component,
	forwardRef,
	ElementRef,
	ViewChild,
	ViewEncapsulation,
	Input,
	Optional,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms'
import * as $ from 'jquery'
import { RedactorConfig } from './config'
import { RedactorGlobalConfig } from './redactor-global-config.class'

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
	@Input() redactorOptions: RedactorConfig
	private _onChange: Function
	private _onTouched: Function
	@ViewChild('content') private content: ElementRef

	constructor(
		@Optional() private globalConfig: RedactorGlobalConfig,
	) {}

	ngOnInit() {
		if (!this.content) {
			throw 'Redactor: No content child'
		}

		let elem = this.content.nativeElement as HTMLTextAreaElement

		const plugins = [
			this.enableSource ? 'source' : undefined,
		].filter(it => !!it)

		let config = {
			plugins,
		} as any

		if (this.minHeight) {
			config.minHeight = +this.minHeight
		}

		config = Object.assign(
			{},
			this.globalConfig,
			config,
			this.redactorOptions,
		)

		$(elem).redactor(config)
	}

	ngAfterViewInit() {
		let elem = this.content.nativeElement
		if (typeof this._onChange === 'function') {
			let cb = this._onChange
			$(elem).on({
				'change.callback.redactor': function() {
					cb(this.code.get())
				}
			})
		}
	}

	writeValue(value) {
		let elem = this.content.nativeElement
		$(elem).redactor('code.set', value)
	}

	registerOnChange(fn) {
		this._onChange = fn
	}

	registerOnTouched(fn) {
		this._onTouched = fn
	}
}
