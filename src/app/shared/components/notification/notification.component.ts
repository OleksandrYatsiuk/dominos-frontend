import { Component, Inject, InjectionToken, TemplateRef } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service'

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss'],
	host: { '[class.ngb-toasts]': 'true' }
})
export class NotificationComponent {
	public status: boolean = true;
	public message;
	constructor(public notificationService: NotificationService) {
	}

	isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
