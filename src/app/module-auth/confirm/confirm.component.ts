import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent  {
	hash: any;
	public progress = 'Verifying email...';
	constructor(
		private route: ActivatedRoute,
	) {
		this.hash = this.route.snapshot.data.hash;
	}

	
}
