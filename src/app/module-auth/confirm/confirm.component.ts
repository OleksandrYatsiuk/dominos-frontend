import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss'],
	standalone: true,
	imports: [],
})
export class ConfirmComponent {
	hash: any;
	public progress = 'Verifying email...';
	constructor(private route: ActivatedRoute) { }

	hash$ = this.route.params.pipe(map((params) => params.hash));
}
