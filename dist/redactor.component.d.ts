/// <reference path="index.d.ts" />
import { ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { RedactorConfig } from './config';
export declare class Redactor implements ControlValueAccessor {
    private host;
    private renderer;
    minHeight: number;
    enableSource: boolean;
    redactorOptions: RedactorConfig;
    private _onChange;
    private _onTouched;
    private content;
    private _value;
    constructor(host: ElementRef, renderer: Renderer);
    ngAfterViewInit(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
