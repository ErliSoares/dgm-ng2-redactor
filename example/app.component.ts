import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { RedactorConfig } from '../src';

@Component({
	selector: 'app',
	providers: [  ],
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.jade',
})
export class AppComponent {
	redactorOptions: RedactorConfig = {
		buttonsHide: ['bold', 'format'],
		minHeight: 200,
	}
	private form: FormGroup

	constructor(
		private formBuilder: FormBuilder,
	) {}

	ngOnInit() {
		this.form = this.formBuilder.group({
			text: [ '<p>This paragraph</p>' ],
		})
	}

	ngOnDestroy() {
	}

	changeContent() {
		this.form.patchValue({
			text: '<h1>Now header</h1>'
		})
	}

	clear() {
		this.form.patchValue({text: undefined})
	}
}
