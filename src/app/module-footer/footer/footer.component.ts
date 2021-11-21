import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { IS_MANAGEMENT } from '../../module-header/components/header/header-permissions';
@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
	constructor() { }
	public isManagement = IS_MANAGEMENT;
	public swaggerUILink = environment.serverUrl.split('/api/v1', 1);
}
