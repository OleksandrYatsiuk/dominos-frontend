import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserRoles } from '@core/models/user.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/module-auth/auth.model';
import { AuthState } from 'src/app/module-auth/state/auth.state';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FooterComponent {
	roles = UserRoles;
	@Select(AuthState.current) user$: Observable<User>;

	constructor() { }
}
