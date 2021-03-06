import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../user-data.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
	hash: any;
	public progress = 'Verifying email...';
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: UserDataService,
		private notification: NotificationService
	) {
		this.hash = this.route.snapshot.data.hash;
	}

	ngOnInit(): void {
		this.http.confirm(this.hash).subscribe(
			({ code }) => {
				this.progress = 'Verifying completed!';
				this.notification.showSuccess('Email was confirmed successfully. You can sign in to the service.')
			},
			(e) => {
				this.notification.showDanger(e.result);
				this.router.navigate(['/']);
			}
		);
	}
}
