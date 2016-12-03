# Angular2 component for redactor

This component wrap around [redactor](https://imperavi.com/redactor/) by @imperavi. Note that redactor is not free, please purchase your own copy.

## Manual
Use as an form input.

```
<form [formGroup]="form">
	<div redactor formControlName="content"></div>
</form>
```

This component has `redactorOptions` property contain all redactor settings as described on redactor's doc.

See `example` folder.
