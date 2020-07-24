import { Component, OnInit } from '@angular/core';
import { IS_MANAGEMENT } from '../header/header-permissions';
import { environment } from '../../../../environments/environment';
@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: [ './footer.component.scss' ]
})
export class FooterComponent {
	constructor() {}
	public isManagement = IS_MANAGEMENT;
	public swaggerUILink = environment.serverURL.split('/api/v1', 1);
}
