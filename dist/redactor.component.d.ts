import { ControlValueAccessor } from '@angular/forms';
import { RedactorConfig } from './config';
import { RedactorGlobalConfig } from './redactor-global-config.class';
export declare class Redactor implements ControlValueAccessor {
    private globalConfig;
    minHeight: number;
    enableSource: boolean;
    redactorOptions: RedactorConfig;
    private _onChange;
    private _onTouched;
    private content;
    constructor(globalConfig: RedactorGlobalConfig);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
